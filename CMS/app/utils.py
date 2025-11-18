import json, os
from app.models import Product, ProductCategory
from app.database import get_db
from sqlalchemy import MetaData, text

def insert_data():
 
    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, "All_product_details1.json")
    with open(file_path, "r", encoding="utf-8") as f:
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

        # Delete all data
        for table in reversed(meta.sorted_tables):
            conn.execute(table.delete())

        # Reset identity/sequence for each table having an autoincrement PK
        for table in meta.sorted_tables:
            if 'id' in table.c:
                # Dynamically fetch the identity/sequence name
                seq_query = text("""
                    SELECT pg_get_serial_sequence(:table_name, 'id');
                """)
                seq_result = conn.execute(seq_query, {"table_name": table.name}).scalar()

                if seq_result:
                    conn.execute(text(f"ALTER SEQUENCE {seq_result} RESTART WITH 1;"))

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
