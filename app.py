import sys
import os

# Add CMS directory to Python path
cms_path = os.path.join(os.path.dirname(__file__), 'CMS')
sys.path.insert(0, cms_path)

# Import the FastAPI app from CMS/main.py
# The relative imports in main.py (like 'from database import') will work
# because database.py is in the same directory (CMS/)
from main import app

# This makes Railway's auto-detection work
__all__ = ['app']

