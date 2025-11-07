from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# f"mysql+pymysql://{username}:{password}@{host}:{port}/{database}" #By changing the URL we can connect any DataBase platform like PostgrSql etc.

DATABASE_URL = "mysql+pymysql://root:YourPassword@localhost:3306/GreenProducts"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=True, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db 
    finally:
        db.close()







