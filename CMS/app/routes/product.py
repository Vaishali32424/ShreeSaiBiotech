from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
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
async def create_product(
    id: str = Form(...),
    name: str = Form(...),
    category_name: int = Form(...),
    short_details: str = Form(...),       # JSON string
    content_sections: str = Form(...),    # JSON string
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Convert JSON strings to dict
    try:
        short_details_dict = json.loads(short_details)
    except:
        raise HTTPException(400, "short_details must be valid JSON")

    try:
        content_sections_dict = json.loads(content_sections)
    except:
        raise HTTPException(400, "content_sections must be valid JSON")

    # Create/Get Category
    db_category = db.query(ProductCategory).filter_by(id=category_name).first()
    if not db_category:
        db_category = ProductCategory(id=category_name)
        db.add(db_category)
        db.commit()
        db.refresh(db_category)

    # Upload image
    upload_result = cloudinary.uploader.upload(
        image.file,
        folder="product_images"
    )

    # Create Product
    product = Product(
        id=id,
        name=name,
        category_id=db_category.id,
        short_details=short_details_dict,
        content_sections=content_sections_dict,
        image_url=upload_result.get("secure_url"),
        image_public_id=upload_result.get("public_id"),
    )

    db.add(product)
    db.commit()
    db.refresh(product)
    return product

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

@router.put("/edit/by/{product_id}", response_model=ProductOut)
async def update_product(
    product_id: str,
    name: Optional[str] = Form(None),
    short_details: Optional[str] = Form(None),
    content_sections: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    product = db.get(Product, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Update only if provided
    if name is not None:
        product.name = name

    if short_details is not None:
        try:
            product.short_details = json.loads(short_details)
        except:
            product.short_details = short_details

    if content_sections is not None:
        try:
            product.content_sections = json.loads(content_sections)
        except:
            product.content_sections = content_sections

    # Handle new image upload
    if image is not None:
        # Delete old Cloudinary image if exists
        if product.image_public_id:
            cloudinary.uploader.destroy(product.image_public_id)

        upload_res = cloudinary.uploader.upload(
            image.file,
            folder="product_images"
        )
        product.image_url = upload_res.get("secure_url")
        product.image_public_id = upload_res.get("public_id")

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
