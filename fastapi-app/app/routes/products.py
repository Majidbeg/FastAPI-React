from fastapi import APIRouter, Depends, status, HTTPException, status, Request, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.db.database import get_db
from app.models.products import Products

import math

router = APIRouter(prefix="/api", tags=["Auth"])


@router.get("/products/get_all_products")
def get_products(
    db: Session = Depends(get_db),
    Page: int = Query(1, ge=1),
    limit: int = Query(20, le=100)
    ):
    try:
        # to get total number of prodcuts
        total_products_count = db.query(Products).count()

        query = db.query(Products)

        # for pagination find offset
        offset = (Page - 1) * limit

        products = query.offset(offset).limit(limit).all()


        total_pages = math.ceil(total_products_count / limit)
        print(Page, total_pages, total_products_count)

        if Page > total_pages:
            return {"No More data"}
        
        else:
            return {
            "total_products_count": total_products_count, 
            "products": products,
            "total_pages": total_pages
        }

        
 
    except Exception as e:
         # unexpected errors
        # db.rollback() #only use when we need to write so unneccesary here
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong"
        )
