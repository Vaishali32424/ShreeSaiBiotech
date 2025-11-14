import json
from models import Product, ProductCategory
from database import get_db

def insert_data():
 
    with open("All_product_details1.json", "r", encoding="utf-8") as f:
        data = json.load(f, strict=False)
    
    db = next(get_db())  # <--- FIX
    
    try:
        for category_name, products in data.items():
    
            # check + create product category
            category = db.query(ProductCategory).filter_by(name=category_name).first()
            if not category:
                category = ProductCategory(name=category_name)
                db.add(category)
                db.commit()
                db.refresh(category)
    
            for item in products:
                product = Product(
                    id=item.get("id"),
                    name=item.get("name"),
                    category_id=category.id,
                    image_url=None,
                    short_details={"table_description": item.get("TableDescription")},
                    content_sections={
                        "paragraph_description": item.get("ParagraphDescription"),
                        "description": item.get("Description")
                    }
                )
                db.add(product)
    
        db.commit()
        print("Data inserted successfully!")
    
    except Exception as e:
        db.rollback()
        print("Error:", e)
    
    finally:
        db.close()


    