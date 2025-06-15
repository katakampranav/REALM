import google.generativeai as genai

from config import Config

genai.configure(api_key=Config.GEMINI_API_KEY)

def split_story_with_llm(text, num_scenes=5):
    prompt = f"""
        Take the following story and restructure it into {num_scenes} scenes. You must REWRITE and ADAPT the content so that each scene contains exactly 15-20 lines while preserving the core story.

        Instructions:
        - REWRITE the story content - don't just copy and paste sections
        - Consize or Expand parts as needed to fit exactly 15-20 lines per scene
        - Use simple, easy-to-understand language - avoid complex or fancy words
        - Write in narrative storytelling style with natural flow - NOT as bullet points or explanations
        - Each scene should be a complete narrative segment
        - Maintain the original plot, characters, and story concept
        - Ensure smooth narrative flow between scenes
        - The scene should look like a big para with minimum 15 lines

        Output format:
        Scene 1:
        [Rewritten content in exactly 15-20 lines]

        Scene 2:
        [Rewritten content in exactly 15-20 lines]

        Here is the original story to adapt:
        {text}
    """
    model = genai.GenerativeModel(model_name="gemini-2.0-flash-exp")
    response = model.generate_content(prompt)
    return response.text if response else None