import json, os
from app.models import Product, ProductCategory
from app.database import get_db
from sqlalchemy import MetaData, text

from sqlalchemy.dialects.postgresql import insert

def insert_data():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, "products_with_images.json")

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f, strict=False)

    db = next(get_db())

    try:
        for category_name, products in data.items():

            # Category
            category = (
                db.query(ProductCategory)
                .filter(ProductCategory.name == category_name)
                .first()
            )

            if not category:
                category = ProductCategory(name=category_name)
                db.add(category)
                db.commit()
                db.refresh(category)

            values = []
            for item in products:
                values.append({
                    "id": item.get("id"),
                    "name": item.get("name"),
                    "category_id": category.id,
                    "image_url": item.get("image_url"),
                    "image_public_id": item.get("image_public_id"),
                    "hot_product": False,
                    "short_details": {
                        "table_description": item.get("TableDescription")
                    },
                    "content_sections": {
                        "paragraph_description": item.get("ParagraphDescription"),
                        "description": item.get("Description")
                    }
                })

            stmt = insert(Product).values(values)
            stmt = stmt.on_conflict_do_nothing(index_elements=["id"])

            db.execute(stmt)

        db.commit()
        print("✅ Products inserted (duplicates ignored safely)")

    except Exception as e:
        db.rollback()
        print("❌ Error while inserting data:", e)

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
