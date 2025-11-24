import os
from app.cloudinary_config import *
import cloudinary.uploader
import cloudinary.api
import json

def list_images_from_folder(folder_name: str):
    print(f"Fetching images from folder: {folder_name}")

    response = cloudinary.api.resources(
        type="upload",
        prefix=f"{folder_name}/",
        max_results=500
    )

    images = []
    for file in response.get("resources", []):
        public_id = file.get("public_id")
        url = file.get("secure_url")
        images.append({"public_id": public_id, "url": url})

    return images


if __name__ == "__main__":
    folder_name = "products"  # <-- Change to your Cloudinary folder name
    output_file = f"{folder_name}_images.json"

    images = list_images_from_folder(folder_name)

    # Save to JSON file
    with open(output_file, "w", encoding="utf-8") as file:
        json.dump(images, file, indent=4, ensure_ascii=False)

    print(f"\nSaved {len(images)} images to JSON file: {output_file}\n")