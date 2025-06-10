from flask import request, jsonify
import re
import time
import logging
import requests
import base64
import os
from io import BytesIO
from dotenv import load_dotenv
import cv2
import numpy as np

from controllers.scene_splitter import split_story_with_llm
from controllers.prompt_builder import build_swapping_image_prompt
from controllers.face_swapping import swap_n_show
from controllers.generate_image import generate_swapping_image

# Load environment variables
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Initialize API key
IMGBB_API_KEY = os.getenv("IMGBB_API_KEY")


def upload_to_imgbb(image_array):
    """Upload numpy array image to ImgBB and return URL"""
    try:
        if not isinstance(image_array, np.ndarray):
            logging.error("Expected numpy array for image upload")
            return None
        
        # OpenCV images are in BGR format, no need to convert for encoding
        # Encode as JPEG for better compression (you can use PNG if quality is critical)
        success, buffer = cv2.imencode('.jpg', image_array, [cv2.IMWRITE_JPEG_QUALITY, 95])
        if not success:
            logging.error("Failed to encode image to JPEG")
            return None
        
        # Convert to base64
        image_b64 = base64.b64encode(buffer.tobytes()).decode('utf-8')
        
        # Upload to ImgBB
        response = requests.post(
            "https://api.imgbb.com/1/upload",
            data={
                "key": IMGBB_API_KEY,
                "image": image_b64
            },
            timeout=30  # Add timeout to prevent hanging
        )
        
        if response.status_code == 200:
            result = response.json()
            if result.get("success"):
                logging.info(f"Successfully uploaded image to ImgBB: {result['data']['url']}")
                return result["data"]["url"]
            else:
                logging.error(f"ImgBB API returned success=false: {result}")
        else:
            logging.error(f"ImgBB upload failed with status {response.status_code}: {response.text}")
        
        return None
        
    except Exception as e:
        logging.error(f"Error uploading to ImgBB: {str(e)}")
        return None


def face_swapping_story_route(app):
    @app.route("/generate-personalized-story", methods=["POST"])
    def generate_story_with_faces():
        start_time = time.time()
        logging.info("⚙️ Starting face-swapping story generation")
        
        try:
            # Step 1: Load and validate input data
            data = request.form
            story = data.get("story", "")
            protagonist = data.get("protagonist", "")
            child_img = request.files['child_photo'].read()
            
            if not story or not protagonist:
                raise ValueError("Missing required fields: story or protagonist")
            
            if 'child_photo' not in request.files:
                raise ValueError("No child photo uploaded")

            # Step 2: Split story into scenes
            scenes_text = split_story_with_llm(story)
            scenes = re.split(r'Scene \d+:', scenes_text)[1:]
            scenes = [scene.strip() for scene in scenes if scene.strip()]
            
            if not scenes:
                raise ValueError("No scenes generated from the story")

            result = []
            success_count = 0

            # Step 3: Generate images for each scene
            for i, scene in enumerate(scenes):
                try:
                    logging.info(f"🖼️ Processing scene {i+1}/{len(scenes)}")
                    
                    # Generate image directly
                    prompt = build_swapping_image_prompt(scene, protagonist)
                    img = generate_swapping_image(prompt)

                    if img:
                        img_bytes = base64.b64decode(img)
                        logging.info(f"📥 Image bytes decoded for scene {i+1}")
                        
                        # Perform face swapping
                        swapped_array = swap_n_show(child_img, img_bytes)
                        logging.info(f"🔄 Face swapping completed for scene {i+1}")

                        # Check if swapping was successful and upload
                        if swapped_array is not None and isinstance(swapped_array, np.ndarray) and swapped_array.size > 0:
                            # Upload the swapped image to ImgBB
                            swapped_url = upload_to_imgbb(swapped_array)
                            
                            if swapped_url:
                                result.append({
                                    "scene_number": i + 1,
                                    "scene_text": scene,
                                    "swapped_image_url": swapped_url
                                })
                                success_count += 1
                                logging.info(f"✅ Successfully generated scene {i+1}")
                            else:
                                logging.warning(f"⚠️ Failed to upload image for scene {i+1}")
                        else:
                            logging.warning(f"⚠️ Face swapping failed for scene {i+1}")
    
                except Exception as scene_error:
                    logging.error(f"❌ Error processing scene {i+1}: {str(scene_error)}")
                    continue

            # Final response
            end_time = time.time()
            duration = end_time - start_time
            
            if not result:
                raise RuntimeError("No scenes were successfully processed")
                
            logging.info(f"✅ Completed {success_count}/{len(scenes)} scenes in {duration:.2f}s")
            
            return jsonify({
                "success": True,
                "storybook": result,
                "processing_time": f"{duration:.2f} seconds",
                "scenes_processed": success_count,
                "total_scenes": len(scenes)
            })

        except Exception as e:
            logging.exception("❌ Critical error in story generation")
            return jsonify({
                "success": False,
                "error": str(e),
                "message": "Failed to generate personalized story"
            }), 500