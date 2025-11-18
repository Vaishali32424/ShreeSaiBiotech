# import os
# import cloudinary
# import cloudinary.uploader

# # CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dmgti7bqt

# cloudinary.config(
#     cloud_name="dmgti7bqt",
#     api_key="389959718539192",
#     api_secret="NOFcpB--mW6cEqgff3z8nDmIk8U"
# )

# @router.post("/upload-image")
# async def upload_image(file: UploadFile = File(...)):
#     try:
#         # Upload to Cloudinary
#         result = cloudinary.uploader.upload(
#             file.file,
#             folder="news_images"     # optional folder name
#         )

#         # Extract URL
#         image_url = result.get("secure_url")

#         return {
#             "message": "Image uploaded successfully",
#             "url": image_url
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
