import google.generativeai as genai
import re
from config import Config

# Configure Gemini API client
genai.configure(api_key=Config.GEMINI_API_KEY)

# Configure the generation settings for the AI model
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192
}

# Initialize the generative AI model
story_model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generation_config,
)

def generate_story(captions, tone, genre, setting, length):
    image_descriptions = ", ".join(captions)
    prompt = f"""
        Please create a story based on the following sequence of image descriptions, maintaining thematic and narrative continuity throughout. The story should be written in:

        Story Elements:
        - Tone: {tone}
        - Genre: {genre}
        - Setting: {setting}

        Image Descriptions:
        {image_descriptions}

        Story Requirements:
        1. First, create a memorable title for the story that captures its essence
        2. Write in simple, easy-to-understand language that anyone can follow
        3. Generate numbered scene titles for my story using the example format "Scene 1: The Wise King" (with the word "Scene" followed by the number, then a colon and the title).
        4. Make sure each scene connects naturally to the next one
        5. Create characters that feel real and that readers can relate to
        6. Keep descriptions clear and vivid but not complicated
        7. Each scene should be at least 7-8 lines long, forming a substantial paragraph that fully develops the moment and creates vivid imagery
        8. Length: {length} scenes

        Story Structure:
        # **[The Story Title]**
        (Title should be bold and prominent)

        Scene 1 : [Scene Title]
        [Scene content that incorporates the relevant image descriptions while building a cohesive narrative. Each scene must be a minimum of 7-8 lines long, providing rich detail and character development while maintaining simple, accessible language.]

        and so on... for all scenes.
        """
    response = story_model.generate_content(prompt)
    return response.text
    
def split_story_into_scenes(story_text):
    scenes = re.split(r'(Scene \d+: [^\n]+)', story_text)
    structured = []
    for i in range(1, len(scenes), 2):
        title = scenes[i].strip()
        content = scenes[i + 1].strip() if i + 1 < len(scenes) else ""
        structured.append((title, content))
    return structured

