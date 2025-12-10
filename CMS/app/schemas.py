from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict, Any
from enum import Enum as PyEnum
from datetime import date
from datetime import datetime
from pydantic import field_validator


class ProductCat(BaseModel):
    name: str
    model_config = ConfigDict(from_attributes=True)


class CategoryOut(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)


class ProductBase(BaseModel):
    name: str
    id: Optional[str]
    image_url: Optional[str]
    short_details: Optional[Dict[str, Any]]
    content_sections: Optional[Dict[str, Any]]
    model_config = ConfigDict(from_attributes=True)


class ProductCreate(ProductBase):
    category: ProductCat    # nested input
    model_config = ConfigDict(from_attributes=True)


class ProductUpdate(ProductBase):
    model_config = ConfigDict(from_attributes=True)


class ProductOut(BaseModel):
    id: str
    name: str
    image_url: Optional[str]
    hot_product: bool = False
    short_details: Optional[Dict[str, Any]]
    content_sections: Optional[Dict[str, Any]]
    category: Optional[CategoryOut]    # nested category data
    model_config = ConfigDict(from_attributes=True)

    @field_validator("content_sections", "short_details", mode="before")
    def convert_empty_strings(cls, v):
        if v == "" or v is None:
            return {}
        return v


class NewsCategoryEnum(str, PyEnum):
    company_news = "company_news"
    industry_news = "industry_news"
    company_exhibition = "company_exhibition"

class NewsCreate(BaseModel):
    news_category: NewsCategoryEnum
    news_title: str
    date: date
    initial_view: int
    short_description: str
    long_description: str

class NewsResponse(BaseModel):
    id: int
    news_category: str
    news_title: str
    date: date
    image_url: str
    initial_view: int
    short_description: str
    long_description: str
    model_config = ConfigDict(from_attributes=True)


class KnowledgeCreate(BaseModel):
    knowledge_title: str
    date: date
    short_description: str
    long_description: str

class KnowledgeResponse(BaseModel):
    id: int
    knowledge_title: str
    date: date
    image_url: str
    short_description: str
    long_description: str
    model_config = ConfigDict(from_attributes=True)

class ContactCreate(BaseModel):
    product_name: str
    name: Optional[str]
    mobile: Optional[str]
    email: Optional[str]
    company_name: Optional[str]
    subject: Optional[str]
    description: Optional[str]

class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    mobile: Optional[str] = None
    description: str
    created_at: datetime

class CategoryUpdate(BaseModel):
    categoryName: str
