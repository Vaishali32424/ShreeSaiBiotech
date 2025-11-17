from fastapi import APIRouter, Depends, HTTPException
from app.schemas import *
from app.utils import *
from sqlalchemy.orm import Session
from app.models import *
from typing import List

router = APIRouter()

@router.post('/create')
def knowledge_create(knowledge: KnowledgeCreate, db: Session = Depends(get_db)):
    new_knowledge = Knowledge(**knowledge.dict())
    db.add(new_knowledge)
    db.commit()
    db.refresh(new_knowledge)
    return new_knowledge

@router.get('get/all', response_model=List[KnowledgeResponse])
def get_all_news(db: Session = Depends(get_db)):
    all_knowledge = db.query(Knowledge).all()
    return all_knowledge

