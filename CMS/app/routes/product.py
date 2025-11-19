from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from app.schemas import *
from sqlalchemy.orm.attributes import InstrumentedAttribute
from app.utils import *
from sqlalchemy.orm import Session
from app.models import *
from app.database import get_db, engine
from sqlalchemy.orm import RelationshipProperty
from typing import List
from app.cloudinary_config import *

router = APIRouter()

@router.post("/create/cat")
def create_category(payload: ProductCat, db: Session = Depends(get_db)):
    new_cat = ProductCategory(
        name=payload.name
    )
    db.add(new_cat)
    db.commit()
    db.refresh(new_cat)
    return new_cat

@router.post("/create", response_model=ProductOut)
def create_product(
    product: ProductCreate,
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
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
    product_data.pop("category")

    # 3. add FK
    product_data["category_id"] = db_category.id

    # 4. upload image to Cloudinary
    try:
        upload_result = cloudinary.uploader.upload(
            image.file,
            folder="product_images"
        )
        image_url = upload_result.get("secure_url")
        public_id = upload_result.get("public_id")

        product_data["image_url"] = image_url
        product_data["image_public_id"] = public_id

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")

    # 5. create product
    db_product = Product(**product_data)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return db_product

@router.get("/by/category/{category_id}", response_model=List[ProductOut])
def get_products_by_cat_id(category_id: int, db: Session = Depends(get_db)):
    products = db.query(Product).filter(Product.category_id == category_id).all()
    return products

@router.get("/get/all/category")
def get_all_category(db: Session = Depends(get_db)):
    all_category = db.query(ProductCategory).all()
    return all_category

@router.delete("/delete/all/data")
def remove_table_data():
    try:
        clear_all_tables(engine)
        return {"status": "success", "message": "All table data deleted."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/get/all", response_model=List[ProductOut])
def get_all_products(db: Session = Depends(get_db)):
    all_products = db.query(Product).all()
    return all_products  

@router.get("/by/id/{product_id}", response_model=ProductOut)
def read_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/edit/by/id/{product_id}", response_model=ProductOut)
def update_product(product_id: str, updated: ProductCreate, db: Session = Depends(get_db)):
    product = db.query(Product).get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    update_data = updated.dict(exclude_unset=True)

    for key, value in update_data.items():
        attr = getattr(Product, key, None)

        # Skip if attribute does not exist
        if not isinstance(attr, InstrumentedAttribute):
            continue

        # Skip relationship fields (causes your error)
        if isinstance(attr.property, RelationshipProperty):
            continue

        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return product

@router.delete("/delete/by/id/{product_id}")
def delete_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}

@router.put("/hot/{id}")
def hot_product_add(id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    product.hot_product = True
    db.commit()
    db.refresh(product)

    return {"message": "Product added to hot product list", "update_product": product}

@router.get('/get/all/hot', response_model=List[ProductOut])
def get_all_hot_products(db: Session = Depends(get_db)):
    hot_products = db.query(Product).filter(Product.hot_product == True)
    if not hot_products:
        raise HTTPException(status_code=404, detail="Hot product not found")
    return hot_products

@router.get("/get/all/search/{product_name}", response_model=List[ProductOut])
def product_search(product_name: str, db: Session = Depends(get_db)):
    search_term = f"%{product_name}%"

    matched_products = (
        db.query(Product)
        .filter(Product.name.ilike(search_term))
        .all()
    )

    if not matched_products:
        raise HTTPException(status_code=404, detail="No matching products found")

    return matched_products
