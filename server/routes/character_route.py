from flask import request, jsonify
from controllers.text_extractor import extract_text_from_file
from controllers.top_characters_recognition import extract_top_characters

def top_characters_route(app):
    @app.route("/extract-characters", methods=["POST"])
    def extract_characters():
        try:
            # Check if we have a file upload or direct text
            if 'file' in request.files:
                file = request.files['file']
                
                if not file or file.filename == '':
                    return jsonify({"error": "No selected file"}), 400
                    
                if not file.filename.lower().endswith(('.pdf', '.docx', '.txt')):
                    return jsonify({"error": "Unsupported file type"}), 400
                    
                # Extract text from file
                story_text = extract_text_from_file(file)
                if not story_text:
                    return jsonify({
                        "error": "No readable text found",
                        "hint": "If this is a PDF, it might be image-based"
                    }), 400
            elif 'text' in request.json:
                story_text = request.json['text']
                story_title = request.json['title']
                if not story_text:
                    return jsonify({"error": "No text provided"}), 400
            else:
                return jsonify({"error": "No file or text provided"}), 400
                
            # Extract top characters
            top_characters = extract_top_characters(story_text)
            
            # Return only the required fields
            return jsonify({
                "extracted_text": story_text,
                "top_characters": top_characters[:3] if len(top_characters) >= 3 else top_characters
            })
            
        except Exception as e:
            return jsonify({
                "error": "Processing failed",
                "details": str(e)
            }), 500