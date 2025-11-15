import json
from models import Product, ProductCategory
from database import get_db
from sqlalchemy import MetaData, text

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


# for PostgreSQL
def clear_all_tables(engine):
    meta = MetaData()
    meta.reflect(bind=engine)

    with engine.connect() as conn:
        trans = conn.begin()
        
        # Delete all rows
        for table in reversed(meta.sorted_tables):
            conn.execute(table.delete())

        # Reset sequences for all tables
        for table in meta.sorted_tables:
            if 'id' in table.c:
                seq_name = f"{table.name}_id_seq"
                conn.execute(text(f"ALTER SEQUENCE {seq_name} RESTART WITH 1;"))

        trans.commit()

## For MySQL
# def clear_all_tables(engine):
#     meta = MetaData()
#     meta.reflect(bind=engine)

#     with engine.connect() as conn:
#         trans = conn.begin()
        
#         # Delete all rows
#         for table in reversed(meta.sorted_tables):
#             conn.execute(table.delete())
#             conn.execute(text(f"ALTER TABLE {table.name} AUTO_INCREMENT = 1;"))

#         trans.commit()
