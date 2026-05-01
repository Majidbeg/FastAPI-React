from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.db.database import get_db
from app.models.user import User

from fastapi import Request
from fastapi.responses import RedirectResponse
import httpx
import os #allow us to use .env file
import jwt
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")
JWT_SECRET = os.getenv("JWT_SECRET")

print(CLIENT_ID, "--------------")


router = APIRouter(prefix="/api", tags=["Auth"])


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(data:LoginRequest, db: Session = Depends(get_db)):
    try:
     #check if user exists
     user = db.query(User).filter(User.email == data.email).first()

     if not user:
        raise HTTPException(
           status_code=status.HTTP_404_NOT_FOUND,
           details="User not found"
        )
     
     return {
        "message": "Logged in successfully",
        "User_email": user.email 
     }
    
    except HTTPException as e:
        # re-raise known errors
        raise e
 
    except Exception as e:
        # unexpected errors
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong"
        )
     

     
class SingupRequest(BaseModel):
   name: str
   email: str
   password: str

@router.post("/signup")
def signup(data: SingupRequest, db: Session = Depends(get_db)):
    try:
       user = db.query(User).filter(User.email == data.email).first()

       if user:
         raise HTTPException(status_code=400, detail="User already exists")
    
       if not user:
          # save user in DB
          new_user=User(
             name=data.name,
             email=data.email,
             password=data.password
          )

          db.add(new_user)     # ➜ add to session
          db.commit()          # ➜ save to DB
          db.refresh(new_user) # ➜ get updated data (id, etc.)

          return {
            "message": "User created",
            "user_id": new_user.name
          }
       
          
    except HTTPException as e:
        # re-raise known errors
        raise e

    except Exception as e:
        # unexpected errors
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong"
        )
       

# GitHub Auth


# 🔐 Create JWT
def create_jwt(user):
    payload = {
        "sub": user["id"],
        "username": user["login"],
        "exp": datetime.now(timezone.utc) + timedelta(hours=1)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

# 🚀 Step 1: Redirect to GitHub
@router.get("/login/github")
def login():
    github_url = (
        "https://github.com/login/oauth/authorize"
        f"?client_id={CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}"
        "&scope=user"
    )
    print(github_url, "-------GithubURL----------")
    
    return RedirectResponse(github_url)

# 🔁 Step 2: Callback
@router.get("/auth/github/callback")
async def callback(request: Request, db: Session = Depends(get_db)):

    code = request.query_params.get("code")

    if not code:
        raise HTTPException(status_code=400, detail="Code not found")

    # 🔄 Exchange code → access token
    token_url = "https://github.com/login/oauth/access_token"

    async with httpx.AsyncClient() as client:
        token_res = await client.post(
            token_url,
            data={
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "code": code,
            },
            headers={"Accept": "application/json"},
        )

    token_json = token_res.json()
    access_token = token_json.get("access_token")

    if not access_token:
        raise HTTPException(status_code=400, detail="Token failed")

    # 👤 Get user data
    user_url = "https://api.github.com/user"

    async with httpx.AsyncClient() as client:
        user_res = await client.get(
            user_url,
            headers={"Authorization": f"Bearer {access_token}"}
        )

    user = user_res.json()

    # 📧 Get email (important!)
    async with httpx.AsyncClient() as client:
        email_res = await client.get(
            "https://api.github.com/user/emails",
            headers={"Authorization": f"Bearer {access_token}"}
        )

    emails = email_res.json()
    primary_email = next(
        (e["email"] for e in emails if e["primary"]),
        None
    )

    user["email"] = primary_email

    # DB Operation
    existing_user = db.query(User).filter(
        User.github_id == str(user["id"])
    ).first()

    print(existing_user, "-----------exis----------------")

    if not existing_user:
        new_user = User(
            name=user["login"],
            email=user["email"],
            github_id=str(user["id"]),
            auth_provider="github",
            password=None  # no password for GitHub users
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        db_user = new_user
    else:
        db_user = existing_user

    # 🔐 Create JWT
    # token = create_jwt(user)
    token = jwt.encode (
        {
            "sub": db_user.id,
            "email": db_user.email,
            "exp": datetime.now(timezone.utc) + timedelta(hours=1)
        },
        JWT_SECRET,
        algorithm="HS256"
    )

       # 👇 ADD THIS HERE
    return RedirectResponse(
        url=f"http://localhost:5173/oauth-success?token={token}"
    )