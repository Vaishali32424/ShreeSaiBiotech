import os
from app.cloudinary_config import *
import cloudinary.uploader

root_folder = "/Users/apple/Documents/ShreeSaiBiotech/All_product_images"

uploaded = []

for subdir, dirs, files in os.walk(root_folder):
    for file in files:
        file_path = os.path.join(subdir, file)
        result = cloudinary.uploader.upload(
            file_path,
            folder="products"  # Cloudinary folder
        )
        uploaded.append({
            "local_file": file,
            "public_id": result["public_id"],
            "url": result["secure_url"]
        })

print(uploaded)
