from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File
from app.schemas import *
from app.utils import *
from sqlalchemy.orm import Session
from app.models import *
import cloudinary
import cloudinary.uploader
import cloudinary.api 
from typing import List

router = APIRouter()

@router.post('/create')
def knowledge_create(
    knowledge_title: str = Form(...),
    date: date = Form(...),
    short_description: str = Form(...),
    long_description: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
    ):
    upload_result = cloudinary.uploader.upload(
        image.file,
        folder="knowledge_images"
    )
    new_knowledge = Knowledge(
        knowledge_title=knowledge_title,
        date=date,
        short_description=short_description,
        long_description=long_description,
        image_url=upload_result["secure_url"],
        image_public_id=upload_result["public_id"]
    )
    db.add(new_knowledge)
    db.commit()
    db.refresh(new_knowledge)
    return new_knowledge

@router.get('/get/by/{id}', response_model=KnowledgeResponse)
def get_knowledge_by_id(id: int, db: Session = Depends(get_db)):
    knowledge = db.query(Knowledge).filter(Knowledge.id == id).first()
    if not knowledge:
        raise HTTPException(status_code=404, detail="Knowledge not found")
    return knowledge

    
@router.delete('/delete/by/{id}')
def knowledge_delete(id: str, db: Session = Depends(get_db)):
    knowledge = db.query(Knowledge).get()
    if not knowledge:
        raise HTTPException(status_code=404, detail="Knoledge not found")
    db.delete(knowledge)
    db.commit()
    return {"message": "Knowledge deleted successfully"}

@router.put("/edit/by/{id}", response_model=KnowledgeResponse)
def knowledge_update(
    id: int,
    knowledge_title: str = Form(None),
    date: date = Form(None),
    short_description: str = Form(None),
    long_description: str = Form(None),
    image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    knowledge = db.query(Knowledge).get(id)
    if not knowledge:
        raise HTTPException(status_code=404, detail="Knowledge not found")
    # --- Update simple fields ---
    if knowledge_title is not None:
        knowledge.knowledge_title = knowledge_title
    if date is not None:
        knowledge.date = date
    if short_description is not None:
        knowledge.short_description = short_description
    if long_description is not None:
        knowledge.long_description = long_description
    # --- Handle image update ---
    if image is not None:
        # Delete old image from Cloudinary
        if knowledge.image_public_id:
            cloudinary.uploader.destroy(knowledge.image_public_id)
        # Upload new image
        upload_result = cloudinary.uploader.upload(
            image.file,
            folder="knowledge_images"
        )
        knowledge.image_url = upload_result["secure_url"]
        knowledge.image_public_id = upload_result["public_id"]
    db.commit()
    db.refresh(knowledge)
    return {
        "message": "Knowledge updated successfully",
        "updated_data": knowledge
    }

    
@router.get('/get/all', response_model=List[KnowledgeResponse])
def get_all_news(db: Session = Depends(get_db)):
    all_knowledge = db.query(Knowledge).all()
    return all_knowledge

