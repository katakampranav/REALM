import logging
from flask import request, jsonify
from PIL import Image
from io import BytesIO
import time

from controllers.image_captioning import generate_caption
from controllers.story_generation import generate_story, split_story_into_scenes
from controllers.generate_image import generate_image
from controllers.prompt_builder import build_image_prompt

# Set up logging (you can also log to a file by adding filename='app.log')
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

def image_to_stories_route(app):
    @app.route("/generate_story", methods=["POST"])
    def option1_pipeline():
        start_time = time.time()
        logging.info("⚙️ Starting /generate_story pipeline")

        try:
            # Step 1: Load form data
            tone = request.form.get("tone")
            genre = request.form.get("genre")
            setting = request.form.get("setting")
            scene_count = int(request.form.get("num_scenes", 5))

            logging.debug(f"Received form data - Tone: {tone}, Genre: {genre}, Setting: {setting}, Scene Count: {scene_count}")
            logging.debug(f"Request form data: {dict(request.form)}")

            # Step 2: Process uploaded images
            files = request.files.getlist("images")
            if not files:
                raise ValueError("No images uploaded.")

            captions = []
            for idx, file in enumerate(files):
                try:
                    image = Image.open(BytesIO(file.read()))
                    caption = generate_caption(image)
                    captions.append(caption)
                    logging.debug(f"Image {idx + 1}: Caption generated - {caption}")
                except Exception as img_err:
                    logging.error(f"❌ Failed to process image {idx + 1}: {img_err}")
                    raise
            
            print(captions)
            # Step 3: Generate story from captions
            try:
                story_text = generate_story(captions, tone, genre, setting, scene_count)
                logging.debug(f"📖 Full story generated.")
            except Exception as story_err:
                logging.error(f"❌ Failed to generate story: {story_err}")
                raise
            print(story_text)
            # Step 4: Split story into scenes
            try:
                scenes = split_story_into_scenes(story_text)
                print(scenes)
                logging.debug(f"🧩 Story split into {len(scenes)} scenes.")
            except Exception as split_err:
                logging.error(f"❌ Failed to split story into scenes: {split_err}")
                raise

            # Step 5: Generate image for each scene
            result = {}
            for i, (title, content) in enumerate(scenes, 1):
                try:
                    prompt = build_image_prompt(title, content)
                    image_b64 = generate_image(prompt)
                    logging.debug(f"🎨 Image generated for Scene {i} with prompt: {prompt}")

                    result[f"Scene {i}"] = {
                        "title": title,
                        "description": content,
                        "image": image_b64
                    }
                except Exception as imggen_err:
                    logging.error(f"❌ Failed to generate image for Scene {i}: {imggen_err}")
                    raise

            # Final response
            end_time = time.time()
            duration = end_time - start_time
            logging.info(f"✅ Story generation completed in {duration:.2f} seconds.")

            return jsonify({"success": True, "story": result})

        except Exception as e:
            logging.exception("❌ Exception occurred during /generate_story pipeline")
            return jsonify({"success": False, "error": str(e)})
