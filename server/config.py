import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    GEMINI_API_KEY = os.getenv("gemini_api_key")
    TOGETHER_AI_API_KEY = os.getenv("TOGETHER_AI_API_KEY")