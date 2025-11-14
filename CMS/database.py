from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
import urllib.parse

load_dotenv()

# Try to get DATABASE_URL directly first
DATABASE_URL = os.getenv("DATABASE_URL")

# If DATABASE_URL is not set, try to construct it from Railway MySQL variables
if not DATABASE_URL:
    # Railway MySQL provides these environment variables
    mysql_host = os.getenv("MYSQL_HOST") or os.getenv("MYSQLHOST")
    mysql_user = os.getenv("MYSQL_USER") or os.getenv("MYSQLUSER")
    mysql_password = os.getenv("MYSQL_PASSWORD") or os.getenv("MYSQLPASSWORD")
    mysql_database = os.getenv("MYSQL_DATABASE") or os.getenv("MYSQLDATABASE")
    mysql_port = os.getenv("MYSQL_PORT") or os.getenv("MYSQLPORT", "3306")
    
    # Also check for MYSQL_URL which Railway sometimes provides
    mysql_url = os.getenv("MYSQL_URL")
    
    if mysql_url:
        # If MYSQL_URL is provided, convert it to pymysql format if needed
        if mysql_url.startswith("mysql://"):
            DATABASE_URL = mysql_url.replace("mysql://", "mysql+pymysql://", 1)
        elif not mysql_url.startswith("mysql+pymysql://"):
            DATABASE_URL = f"mysql+pymysql://{mysql_url.split('://')[1]}" if "://" in mysql_url else f"mysql+pymysql://{mysql_url}"
    elif mysql_host and mysql_user and mysql_password and mysql_database:
        # Construct DATABASE_URL from individual components
        # URL encode the password in case it contains special characters
        encoded_password = urllib.parse.quote_plus(mysql_password)
        DATABASE_URL = f"mysql+pymysql://{mysql_user}:{encoded_password}@{mysql_host}:{mysql_port}/{mysql_database}"

# Validate that we have a DATABASE_URL
if not DATABASE_URL:
    raise ValueError(
        "DATABASE_URL or MySQL connection variables not found. "
        "Please set DATABASE_URL or MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE "
        "environment variables in Railway."
    )

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=True, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db 
    finally:
        db.close()
