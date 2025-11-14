from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db, engine
from models import Product, ProductCategory, Base
from schemas import ProductCat, ProductCreate, ProductOut
from fastapi.middleware.cors import CORSMiddleware
from data_insert import *
 
app = FastAPI()
 
app.add_middleware(
    CORSMiddleware,
    # allow_origins = ["http://localhost:3000"],
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

# Create tables on startup (only if database is available)
@app.on_event("startup")
async def startup_event():
    try:
        Base.metadata.create_all(bind=engine)
        print("Database tables created/verified successfully")
    except Exception as e:
        print(f"WARNING: Could not create database tables: {e}")
        print("Make sure DATABASE_URL or MySQL connection variables are set correctly in Railway.")


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

@app.post("/create/products/cat")
def create_category(payload: ProductCat, db: Session = Depends(get_db)):
    new_cat = ProductCategory(
        name=payload.name
    )
    db.add(new_cat)
    db.commit()
    db.refresh(new_cat)
    return new_cat

@app.post("/create/product", response_model=ProductOut)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    # 1. check / create category
    category_name = product.category.name
    db_category = db.query(ProductCategory).filter_by(name=category_name).first()
    if not db_category:
        db_category = ProductCategory(name=category_name)
        db.add(db_category)
        db.commit()
        db.refresh(db_category)

    # 2. remove category from payload
    product_data = product.dict()
    product_data.pop("category")   # remove nested category

    # 3. add FK mapping
    product_data["category_id"] = db_category.id

    # 4. create product
    db_product = Product(**product_data)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return db_product

@app.get("/products/by/category/{category_id}")
def get_products_by_cat_id(category_id: int, db: Session = Depends(get_db)):
    products = db.query(Product).filter(Product.category_id == category_id).all()
    return products

@app.get("/get/all/category")
def get_all_category(db: Session = Depends(get_db)):
    all_category = db.query(ProductCategory).all()
    return all_category

@app.get("/data/insert")
def data_insert():
    try:
        insert_data()
    except Exception as e:
        print(f"WARNING: issue in inserting data {e}")

@app.get("/get/all/products", response_model=List[ProductOut])
def get_all_products(db: Session = Depends(get_db)):
    all_products = db.query(Product).all()
    print(all_products)  
    return all_products  

@app.get("/product/by/id/{product_id}", response_model=ProductOut)
def read_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.put("/edit/products/by/id/{product_id}", response_model=ProductOut)
def update_product(product_id: int, updated: ProductCreate, db: Session = Depends(get_db)):
    product = db.query(Product).get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    for key, value in updated.dict(exclude_unset=True).items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return product

@app.delete("/delete/product/by/id/{product_id}")
def delete_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}
