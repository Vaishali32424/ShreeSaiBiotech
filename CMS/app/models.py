from sqlalchemy import Column, Integer, String, JSON, ForeignKey, Date, Text, Enum, Boolean, DateTime
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime
from sqlalchemy.orm import relationship
 
Base = declarative_base()

class ProductCategory(Base):
    __tablename__ = "product_category"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(150), unique=True, nullable=False)

    products = relationship(
        "Product",
        back_populates="category",
        cascade="all, delete-orphan"
    )
class Product(Base):
    __tablename__ = "products"
    id = Column(String(255), primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    image_url = Column(String(1100), nullable=True)
    image_public_id = Column(String(255), nullable=True)
    hot_product = Column(Boolean, default=False)
    short_details = Column(JSON, nullable=True)
    content_sections = Column(JSON, nullable=True)
    category_id = Column(
        Integer,
        ForeignKey("product_category.id", ondelete="CASCADE")
    )
    category = relationship(
        "ProductCategory",
        back_populates="products"
    )

class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    news_category = Column(
    Enum(
        "company_news",
        "industry_news",
        "company_exhibition",
        name="news_category_enum"
    ),
    nullable=False
    )
    news_title = Column(String(200), nullable=False)
    date = Column(Date)
    initial_view = Column(Integer, default=0)
    short_description = Column(Text)
    long_description = Column(Text)
    image_url = Column(String(2000), nullable=True)
    image_public_id = Column(String(500), nullable=True)   # <-- REQUIRED


class Knowledge(Base):
    __tablename__ = "knowledge"

    id = Column(Integer, primary_key=True, index=True)
    knowledge_title = Column(String(200), nullable=False)
    date = Column(Date)
    short_description = Column(Text)
    long_description = Column(Text)
    image_url = Column(String(2000), nullable=True)
    image_public_id = Column(String(500), nullable=True)   # <-- REQUIRED


class Contact(Base):
    __tablename__ = "contact"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String(200), nullable=False)
    name = Column(String(100))
    mobile = Column(String(20), unique=True)
    email = Column(String(100), unique=True, nullable=False)
    company_name = Column(String(100))
    subject = Column(String(200))
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)   # stores first-time created timestamp

