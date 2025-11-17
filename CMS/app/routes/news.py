from fastapi import APIRouter, Depends, HTTPException
from app.schemas import NewsCreate, NewsResponse
from app.utils import get_db
from sqlalchemy.orm import Session
from app.models import News
from typing import List

router = APIRouter()


@router.post('/create', response_model=NewsResponse)
def create_news(news: NewsCreate, db: Session = Depends(get_db)):
    new_news = News(**news.dict())
    new_news.news_category = news.news_category.value
    db.add(new_news)
    db.commit()
    db.refresh(new_news)
    return new_news



@router.get('/get/all', response_model=List[NewsResponse])
def get_all_news(db: Session = Depends(get_db)):
    return db.query(News).all()
