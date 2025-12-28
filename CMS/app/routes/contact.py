from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File
from app.schemas import *
from app.utils import *
from sqlalchemy.orm import Session
from app.models import *
from typing import List
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()

from fastapi import BackgroundTasks

@router.post("/create")
def create_contact(
    contact: ContactCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    if contact.mobile:
        if db.query(Contact).filter(Contact.mobile == contact.mobile).first():
            raise HTTPException(status_code=400, detail="Mobile number already exists")
    if contact.email:
        if db.query(Contact).filter(Contact.email == contact.email).first():
            raise HTTPException(status_code=400, detail="Email already exists")
    new_contact = Contact(**contact.dict())
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    email_msg = f"""
    New Contact Form Submission
    Product Name: {contact.product_name}
    Name: {contact.name}
    Mobile: {contact.mobile}
    Email: {contact.email}
    Company: {contact.company_name}
    Subject: {contact.subject}
    Message: {contact.description}
    """
    # ✅ Run email in background
    background_tasks.add_task(Email_send, email_msg)
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

import smtplib

G_Passkey = os.getenv("G_Passkey")

def Email_send(email_msg: str):
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587, timeout=20)
        server.starttls()
        server.login('sales.biotechss02@gmail.com', G_Passkey)
        server.sendmail(
            'sales.biotechss02@gmail.com',
            'info@shreesaibiotech.com',
            email_msg
        )
        server.quit()
    except Exception as e:
        print("Email error:", e)


# from email.mime.text import MIMEText

# def send_email_to_owner(form_data):
#     sender_email = "yourcompany@gmail.com"
#     sender_password = "your_app_password"  # Gmail App Password
#     product_owner_email = "aman@gmail.com"

#     # prepare email content
#     body = f"""
#     New Contact Form Submitted:

#     Name: {form_data.name}
#     Mobile: {form_data.mobile}
#     Email: {form_data.email}
#     Company: {form_data.company_name}
#     Subject: {form_data.subject}
#     Description: {form_data.description}
#     """

#     msg = MIMEText(body)
#     msg["Subject"] = "New Contact Form Submission"
#     msg["From"] = sender_email
#     msg["To"] = product_owner_email

#     with smtplib.SMTP("smtp.gmail.com", 587) as server:
#         server.starttls()
#         server.login(sender_email, sender_password)
#         server.sendmail(sender_email, product_owner_email, msg.as_string())
