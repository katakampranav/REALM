from flask import Flask
from flask_cors import CORS

from routes.character_route import top_characters_route
from routes.face_swapping_story_route import face_swapping_story_route
from routes.image_to_story_route import image_to_stories_route

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Routes
image_to_stories_route(app)
top_characters_route(app)
face_swapping_story_route(app)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)