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


@router.delete("/delete/by/{id}")
def knowledge_delete(id: int, db: Session = Depends(get_db)):
    knowledge = db.get(Knowledge, id)
    if not knowledge:
        raise HTTPException(status_code=404, detail="Knowledge not found")

    db.delete(knowledge)
    db.commit()
    return {"message": "Knowledge deleted successfully"}


@router.put("/edit/by/{id}", response_model=KnowledgeResponse)
def knowledge_update(
    id: int,
    knowledge_title: Optional[str] = Form(None),
    date: date = Form(None),
    short_description: Optional[str] = Form(None),
    long_description: Optional[str] = Form(None),
    initial_view: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    # Find knowledge record
    knowledge = db.query(Knowledge).filter(Knowledge.id == id).first()
    if not knowledge:
        raise HTTPException(status_code=404, detail="Knowledge not found")

    # --- Update normal fields dynamically ---
    update_fields = {
        "knowledge_title": knowledge_title,
        "date": date,
        "initial_view": initial_view,
        "short_description": short_description,
        "long_description": long_description
    }

    for field, value in update_fields.items():
        if value is not None:
            setattr(knowledge, field, value)

    # --- Handle image update ---
    if image:
        # Delete old image
        if knowledge.image_public_id:
            cloudinary.uploader.destroy(knowledge.image_public_id)

        # Upload new image
        upload_result = cloudinary.uploader.upload(
            image.file,
            folder="knowledge_images"
        )

        knowledge.image_url = upload_result.get("secure_url")
        knowledge.image_public_id = upload_result.get("public_id")

    # Save changes
    db.commit()
    db.refresh(knowledge)

    return knowledge


    
@router.get('/get/all', response_model=List[KnowledgeResponse])
def get_all_news(db: Session = Depends(get_db)):
    all_knowledge = db.query(Knowledge).all()
    return all_knowledge

