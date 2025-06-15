from PyPDF2 import PdfReader
from docx import Document
import io

def extract_text_from_file(file):
    try:
        if file.filename.lower().endswith('.pdf'):
            # Reset file pointer since Flask consumes it
            file.stream.seek(0)
            reader = PdfReader(file.stream)
            text = ""
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
            return text.strip()
            
        elif file.filename.lower().endswith('.docx'):
            # Reset file pointer
            file.stream.seek(0)
            doc = Document(io.BytesIO(file.stream.read()))
            return "\n".join([para.text for para in doc.paragraphs if para.text.strip()])
            
        elif file.filename.lower().endswith('.txt'):
            # Reset file pointer
            file.stream.seek(0)
            return file.stream.read().decode('utf-8').strip()
            
    except Exception as e:
        print(f"Error extracting text: {str(e)}")
        return None