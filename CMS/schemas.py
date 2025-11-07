from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict
 
class ProductCat(BaseModel):
    name: str
 
class ProductBase(BaseModel):
    name: str
    id: str
    image_url: Optional[str]
    short_details: Optional[Dict[str, Optional[str]]]
    content_sections: Optional[Dict[str, Optional[str]]]
 
class ProductCreate(ProductBase):
    category: ProductCat   # <-- nested
 
class ProductUpdate(ProductBase):
    pass
 
class ProductOut(ProductBase):
    id: str
    category: Optional[ProductCat]
 
model_config = ConfigDict(from_attributes=True)
 
 
# {
#   "name": "iPhone 15",
#   "image_url": "https://example.com/img.png",
#   "short_details": {"ram": "8GB", "storage": "256GB"},
#   "content_sections": {"overview": "awesome product"},
#   "category": {
#     "name": "Mobile"
#   }
# }
