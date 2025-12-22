from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

# Load database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise Exception("DATABASE_URL is not set in environment variables.")

# Render gives URL like: postgres://user:pass@host/db
# SQLAlchemy requires:   postgresql://user:pass@host/db
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

try:
    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,
        connect_args={"sslmode": "require"}
    )
except Exception as e:
    print(f"ERROR: Failed to create database engine: {e}")
    raise

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# from supabase import create_client, Client

# SUPABASE_URL = 'https://fsbrubznebeirvotufjw.supabase.co'
# SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzYnJ1YnpuZWJlaXJ2b3R1Zmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2OTg2ODIsImV4cCI6MjA4MTI3NDY4Mn0.e6JIe_E3NWEpBmY1knqzv4k5i9J3nhhO0gKfRwluoaM'

# supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

