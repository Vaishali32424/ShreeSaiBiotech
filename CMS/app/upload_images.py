import os
import cloudinary
import cloudinary.uploader

# CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dmgti7bqt

cloudinary.config(
    cloud_name="dmgti7bqt",
    api_key="389959718539192",
    api_secret="NOFcpB--mW6cEqgff3z8nDmIk8U"
)

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
