from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File
from app.schemas import *
from app.utils import *
from sqlalchemy.orm import Session
from app.models import *
from typing import List

router = APIRouter()

@router.post("/create")
def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    # Check if mobile already exists
    if contact.mobile:
        existing_mobile = db.query(Contact).filter(Contact.mobile == contact.mobile).first()
        if existing_mobile:
            raise HTTPException(status_code=400, detail="Mobile number already exists")
    # Check if email already exists
    if contact.email:
        existing_email = db.query(Contact).filter(Contact.email == contact.email).first()
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already exists")
    new_contact = Contact(
        name=contact.name,
        mobile=contact.mobile,
        email=contact.email,
        company_name=contact.company_name,
        subject=contact.subject,
        description=contact.description
    )
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    return {
        "message": "Contact created successfully",
        "data": new_contact
    }

@router.get('/get/all', response_model=List[ContactResponse])
def get_all_contacts(db: Session = Depends(get_db)):
    contacts = db.query(Contact).all()
    if not contacts:
        raise HTTPException(status_code=404, detail="Contacts not found")
    return contacts

