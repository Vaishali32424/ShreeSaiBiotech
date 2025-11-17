from sqlalchemy import Column, Integer, String, JSON, ForeignKey, Date, Text, Enum
from sqlalchemy.orm import declarative_base, relationship
 
Base = declarative_base()
 
class ProductCategory(Base):
    __tablename__ = "product_category"
 
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(150), unique=True, nullable=False)
 
class Product(Base):
    __tablename__ = "products"
 
    id = Column(String(255), primary_key=True, index=True)  # keep as string but increased length
    name = Column(String(200), nullable=False)
    image_url = Column(String(2000), nullable=True)
 
    short_details = Column(JSON, nullable=True)
    content_sections = Column(JSON, nullable=True)
 
    category_id = Column(Integer, ForeignKey("product_category.id"))
    category = relationship("ProductCategory", backref="products")

class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    news_category = Column(
        Enum("Company News", "Industry News", "Company Exhibition", name="news_category_enum"),
        nullable=False
    )
    news_title = Column(String(200), nullable=False)
    
    date = Column(Date)  # correct data type
    initial_view = Column(Integer)
    short_description = Column(Text)
    long_description = Column(Text)  # fixed spelling

class Knowledge(Base):
    __tablename__ = "knowledge"

    id = Column(Integer, primary_key=True, index=True)
    knowledge_title = Column(String(200), nullable=False)
    date = Column(Date)
    short_description = Column(Text)
    long_description = Column(Text)

