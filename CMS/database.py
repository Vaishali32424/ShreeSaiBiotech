from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
import urllib.parse

load_dotenv()

# Try to get DATABASE_URL directly first
DATABASE_URL = os.getenv("DATABASE_URL")

# # If DATABASE_URL is not set, try to construct it from platform-specific variables
# if not DATABASE_URL:
#     # Check for Render/Platform MySQL variables
#     mysql_host = os.getenv("MYSQL_HOST") or os.getenv("MYSQLHOST")
#     mysql_user = os.getenv("MYSQL_USER") or os.getenv("MYSQLUSER")
#     mysql_password = os.getenv("MYSQL_PASSWORD") or os.getenv("MYSQLPASSWORD")
#     mysql_database = os.getenv("MYSQL_DATABASE") or os.getenv("MYSQLDATABASE")
#     mysql_port = os.getenv("MYSQL_PORT") or os.getenv("MYSQLPORT", "3306")
    
#     # Check for MYSQL_URL (some platforms provide this)
#     mysql_url = os.getenv("MYSQL_URL")
    
#     # Check for Render PostgreSQL (Render's default database)
#     # If you want to use PostgreSQL instead, uncomment and install psycopg2
#     # postgres_url = os.getenv("DATABASE_URL")  # Render provides this for PostgreSQL
    
#     if mysql_url:
#         # If MYSQL_URL is provided, convert it to pymysql format if needed
#         if mysql_url.startswith("mysql://"):
#             DATABASE_URL = mysql_url.replace("mysql://", "mysql+pymysql://", 1)
#         elif not mysql_url.startswith("mysql+pymysql://"):
#             DATABASE_URL = f"mysql+pymysql://{mysql_url.split('://')[1]}" if "://" in mysql_url else f"mysql+pymysql://{mysql_url}"
#     elif mysql_host and mysql_user and mysql_password and mysql_database:
#         # Construct DATABASE_URL from individual components
#         # URL encode the password in case it contains special characters
#         encoded_password = urllib.parse.quote_plus(mysql_password)
#         DATABASE_URL = f"mysql+pymysql://{mysql_user}:{encoded_password}@{mysql_host}:{mysql_port}/{mysql_database}"

# # Validate that we have a DATABASE_URL
# if not DATABASE_URL:
#     error_msg = (
#         "\n" + "="*60 + "\n"
#         "ERROR: DATABASE_URL or MySQL connection variables not found!\n"
#         "\n"
#         "Please do ONE of the following in Render:\n"
#         "\n"
#         "1. Link your MySQL database service:\n"
#         "   - Go to your web service → Environment → Add Environment Variable\n"
#         "   - Click 'Link Database' and select your MySQL database\n"
#         "   - Render will automatically add DATABASE_URL\n"
#         "\n"
#         "2. OR manually set DATABASE_URL:\n"
#         "   - Go to your web service → Environment\n"
#         "   - Add: DATABASE_URL = mysql+pymysql://user:password@host:port/database\n"
#         "\n"
#         "3. OR set individual MySQL variables:\n"
#         "   - MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT\n"
#         "\n"
#         "Note: If using Render's PostgreSQL (default), you'll need to:\n"
#         "   - Install psycopg2-binary in requirements.txt\n"
#         "   - Change database URL format to: postgresql://user:pass@host:port/db\n"
#         "="*60 + "\n"
#     )
#     print(error_msg)
#     raise ValueError(error_msg)

# Create engine with connection pooling and error handling
try:
    engine = create_engine(
        DATABASE_URL
    )
except Exception as e:
    print(f"ERROR: Failed to create database engine: {e}")
    raise

SessionLocal = sessionmaker(autocommit=False, autoflush=True, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db 
    finally:
        db.close()
