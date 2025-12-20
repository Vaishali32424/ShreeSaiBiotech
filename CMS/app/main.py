from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db, engine
from app.models import Base, Contact
from app.schemas import *
from fastapi.middleware.cors import CORSMiddleware
from app.utils import *
from sqlalchemy.orm.attributes import InstrumentedAttribute
from sqlalchemy.orm import RelationshipProperty
 
app = FastAPI()
 
app.add_middleware(
    CORSMiddleware,
    # allow_origins = ["http://localhost:3000"],
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

from app.routes.product import router as product_router
from app.routes.news import router as news_router
from app.routes.knowledge import router as knowledge_router
from app.routes.contact import router as contact_router

app.include_router(product_router, prefix='/product', tags=["product api's"])
app.include_router(news_router, prefix='/news', tags=["news api's"])
app.include_router(knowledge_router, prefix='/knowledge', tags=["knowledge api's"])
app.include_router(contact_router, prefix='/contact', tags=["contact api's"])


# Create tables on startup (only if database is available)
# @app.on_event("startup")
# async def startup_event():
#     try:
#         Base.metadata.create_all(bind=engine)
#         print("Database tables created/verified successfully")
#     except Exception as e:
#         print(f"WARNING: Could not create database tables: {e}")
#         print("Make sure DATABASE_URL or MySQL connection variables are set correctly in Railway.")

@app.get("/")
def root():
    return {"message": "ShreeSaiBiotech API is running", "status": "ok"}

@app.get("/health")
def health_check():
    try:
        # Try to connect to database
        from database import engine
        with engine.connect() as conn:
            return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}

@app.get("/data/insert")
def data_insert():
    try:
        insert_data()
    except Exception as e:
        print(f"WARNING: issue in inserting data {e}")

