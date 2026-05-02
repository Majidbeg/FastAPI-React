from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Numeric
from sqlalchemy.dialects.postgresql import ARRAY
from app.db.database import Base
from datetime import datetime
from app.db.database import Base

class Products(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    
    name = Column(String(255), nullable=False)
    brand = Column(String(100))
    category = Column(String(100))
    
    price = Column(Numeric(10, 2))   # matches numeric(10,2)
    rating = Column(Numeric(2, 1))   # matches numeric(2,1)
    
    in_stock = Column(Boolean, default=True)
    discount = Column(Integer)
    
    tags = Column(ARRAY(String))  # PostgreSQL array
    
    created_at = Column(DateTime, default=datetime.utcnow)

    