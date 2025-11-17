from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict, Any
from enum import Enum as PyEnum
from datetime import date


class ProductCat(BaseModel):
    name: str
    model_config = ConfigDict(from_attributes=True)


class CategoryOut(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)


class ProductBase(BaseModel):
    name: str
    id: str
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
    short_details: Optional[Dict[str, Any]]
    content_sections: Optional[Dict[str, Any]]
    category: Optional[CategoryOut]    # nested category data
    model_config = ConfigDict(from_attributes=True)


class NewsCategoryEnum(PyEnum):
    company_news = "Company News"
    industry_news = "Industry News"
    company_exhibition = "Company Exhibition"

class NewsCreate(BaseModel):
    news_category: NewsCategoryEnum
    news_title: str
    date: date
    short_description: str
    long_description: str

class NewsResponse(BaseModel):
    id: int
    news_category: str
    news_title: str
    date: date
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
    short_description: str
    long_description: str
    model_config = ConfigDict(from_attributes=True)
