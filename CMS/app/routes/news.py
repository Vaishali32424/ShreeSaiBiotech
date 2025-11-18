from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from app.schemas import NewsCreate, NewsResponse, NewsCategoryEnum
from app.utils import get_db
from sqlalchemy.orm import Session
from app.models import News
from typing import List
from app.cloudinary_config import *
import cloudinary
import cloudinary.uploader
import cloudinary.api 
from fastapi import Form
from datetime import date


router = APIRouter()


@router.post("/create", response_model=NewsResponse)
def create_news(
    news_category: NewsCategoryEnum = Form(...),
    news_title: str = Form(...),
    date: date = Form(...),
    initial_view: int = Form(...),
    short_description: str = Form(...),
    long_description: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Cloudinary upload
    upload_result = cloudinary.uploader.upload(
        image.file,
        folder="news_images"
    )

    new_news = News(
        news_category=news_category.value,
        news_title=news_title,
        date=date,
        initial_view=initial_view,
        short_description=short_description,
        long_description=long_description,
        image_url=upload_result["secure_url"],
        image_public_id=upload_result["public_id"]
    )

    db.add(new_news)
    db.commit()
    db.refresh(new_news)

    return new_news


@router.get('/get/all', response_model=List[NewsResponse])
def get_all_news(db: Session = Depends(get_db)):
    return db.query(News).all()

@router.get('/get/by/{id}', response_model=NewsResponse)
def get_news_by_id(id: int, db: Session = Depends(get_db)):
    news = db.query(News).filter(News.id == id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    return news

from typing import Optional

@router.put("/edit/by/{id}")
def update_news(
    id: str,
    news_category: Optional[NewsCategoryEnum] = Form(None),
    news_title: Optional[str] = Form(None),
    date: Optional[str] = Form(None),
    short_description: Optional[str] = Form(None),
    long_description: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    # Fetch record
    existing_news = db.query(News).filter(News.id == id).first()

    if not existing_news:
        raise HTTPException(status_code=404, detail="News not found")

    # Update non-image fields
    if news_category is not None:
        existing_news.news_category = news_category.value

    if news_title is not None:
        existing_news.news_title = news_title

    if date is not None:
        existing_news.date = date

    if short_description is not None:
        existing_news.short_description = short_description

    if long_description is not None:
        existing_news.long_description = long_description

    # 👉 Only upload if image is provided
    if image is not None and image.filename:
        # 1. Upload new
        upload_result = cloudinary.uploader.upload(
            image.file,
            folder="news_images"
        )
        new_url = upload_result.get("secure_url")

        # 2. Delete old image if exists
        if existing_news.image_url:
            try:
                public_id = existing_news.image_public_id
                cloudinary.uploader.destroy(public_id)
            except:
                pass

        # 3. Update DB
        existing_news.image_url = new_url
        existing_news.image_public_id = upload_result.get("public_id")

    db.commit()
    db.refresh(existing_news)

    return {
        "message": "News updated successfully",
        "updated_data": existing_news,
    }


@router.delete('/delete/by/id/{id}')
def news_delete(id: int, db: Session = Depends(get_db)):
    news = db.query(News).get(id)
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    db.delete(news)
    db.commit()
    return {"message": "Product deleted successfully"}
    

@router.get('/get/by/{category}', response_model=List[NewsResponse])
def get_news_by_category(
    category: NewsCategoryEnum,
    db: Session = Depends(get_db)
):
    news_list = (
        db.query(News)
        .filter(News.news_category == category.value)
        .all()
    )

    if not news_list:
        raise HTTPException(status_code=404, detail="No news found for this category")

    return news_list






