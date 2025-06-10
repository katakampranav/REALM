from PIL import Image
from io import BytesIO
from together import Together
from config import Config
import requests
import base64
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize API keys
TOGETHER_AI_KEY = Config.TOGETHER_AI_API_KEY
IMGBB_API_KEY = os.getenv("IMGBB_API_KEY")

def upload_image_to_imgbb(image_data, api_key):
    """Uploads base64 image data to ImgBB and returns the URL"""
    response = requests.post(
        "https://api.imgbb.com/1/upload",
        data={
            "key": api_key,
            "image": image_data
        }
    )
    
    if response.status_code == 200:
        return response.json()["data"]["url"]
    else:
        print(f"❌ Error uploading image: {response.text}")
        return None

def generate_image(img_prompt):
    """Generates an image using Together AI and uploads it to ImgBB"""
    client = Together(api_key=TOGETHER_AI_KEY)
    
    # Generate the image
    response = client.images.generate(
        prompt=img_prompt,
        model="black-forest-labs/FLUX.1-schnell-Free",
        width=1024,
        height=768,
        steps=4,
        n=1,
        response_format="b64_json",
        stop=[]
    )

    if response and hasattr(response, "data") and response.data:
        b64_img = response.data[0].b64_json
        
        # Upload to ImgBB
        image_url = upload_image_to_imgbb(b64_img, IMGBB_API_KEY)
        if image_url:
            print(f"✅ Image generated and uploaded: {image_url}")
            return image_url
        else:
            print("❌ Failed to upload image to ImgBB")
            return None
    
    print("❌ Failed to generate image")
    return None

def generate_swapping_image(img_prompt):
    """Generates an image using Together AI based on scene text."""
    client = Together(api_key=TOGETHER_AI_KEY)
    response = client.images.generate(
        prompt = img_prompt,
        model="black-forest-labs/FLUX.1-schnell-Free",
        width=1024,
        height=768,
        steps=4,
        n=1,
        response_format="b64_json",
        stop=[]
    )

    if response and hasattr(response, "data") and response.data:
        import base64
        b64_img = response.data[0].b64_json
        return b64_img
    return None