import spacy
from collections import Counter

# Load the model once at startup
nlp = spacy.load("en_core_web_sm")

def extract_top_characters(text, num_characters=3):
    try:
        doc = nlp(text)
        characters = []
        for ent in doc.ents:
            if ent.label_ == "PERSON":
                # Clean and normalize names
                name = ent.text.strip().title()
                if len(name.split()) <= 3:  # Ignore overly long "names"
                    characters.append(name)
        
        # Get most common characters, handling case variations
        char_counts = Counter(characters)
        # Merge similar names (case-insensitive)
        merged_counts = Counter()
        for name, count in char_counts.items():
            merged_counts[name.title()] += count
        
        return [name for name, count in merged_counts.most_common(num_characters)]
    
    except Exception as e:
        print(f"Error in character extraction: {str(e)}")
        return []