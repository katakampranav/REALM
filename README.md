<h1 align="center">REALM AI-Powered Virtual Storytelling Platform</h1>

<p align="center">
  <img src="https://github.com/user-attachments/assets/dc247cdd-8cc6-442a-8b45-8089fe70fd7b" alt="Logo" width="300"/>
</p>

> Create personalized stories from your own images, or see yourself as the hero in magical narratives — powered by LLMs, image generation, and face swapping!

---
### Before exploring the project, please check out the project demo. This will give you a better understanding of the experience.

In the "Pick to Tale" section, I selected four different images and created an imaginary story around them.

In the "Hero Time – Face Swapping" section, I used a Superman story and swapped the hero's face with Shah Rukh Khan's for a clearer and more engaging demonstration.

Watch This Video on YouTube: 

[![Image](https://github.com/user-attachments/assets/87e953b3-90b7-493e-9999-3c8294a37217)](https://youtu.be/t04_B9zvcF4)

---

## Overview

This platform transforms storytelling into a **highly interactive and personalized experience** using AI. Users can choose between:

1. **Image-Based Story Generation** – Upload your own photos (art, sketches, family pics, etc.) and generate custom, coherent stories scene-by-scene.
2. **Face-Swapped Story Adventures** – Upload a personal photo and become the main character in prewritten or custom stories.

The final story is generated with vivid illustrations and can be downloaded as a PDF storybook.

---

## Features

*  **BLIP-based Image Captioning** (API or local)
*  **LLM-powered Story Generation** (via Gemini)
*  **Scene-by-Scene Image Creation** (via Blackforest Labs FLUX)
*  **Face Swapping with InsightFace** for immersive personalization
*  PDF generation of completed stories
*  Named Entity Recognition (NER) to detect main characters (via Spacy library)
*  Fully modular Flask backend with organized routes & controllers

---

## Tech Stack

| Category         | Tech Used                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------- |
| Frontend         | ReactJS, Tailwind CSS + GSAP Animations                                                  |
| Backend          | Flask (modular with controller/route logic)                                              |
| Image Captioning | [BLIP model](https://huggingface.co/Salesforce/blip-image-captioning-base)               |
| LLMs for Text    | [Gemini Pro API](https://aistudio.google.com/prompts/new_chat)                           |
| Image Generation | [Together AI - FLUX.1](https://www.together.ai/)                                         |
| Face Swapping    | [InsightFace + InSwapper](https://github.com/deepinsight/insightface)                    |
| Image Hosting    | [ImgBB](https://imgbb.com/)                                                              |
| PDF Generation   | FPDF / PIL                                                                               |

---

## How It Works

### Option 1: Image-Based Story Creation

1. Upload 3–5 images
2. Select tone, genre, setting, and number of scenes
3. AI captions each image
4. Gemini generates a personalized story
5. Blackforest Labs Flux image generation model creates images per scene
6. Output = Downloadable illustrated storybook (JSON + PDF)

### Option 2: Become the Hero

1. Upload your photo
2. Choose an existing/custom story
3. Top 3 characters detected via NER
4. Choose protagonist → LLM segments story
5. Blackforest Labs Flux + InsightFace generate face-swapped story scenes

---

## Setup & Run Locally

### Clone the Repo

```bash
git clone https://github.com/katakampranav/REALM
cd REALM
```

### Setup Backend

#### Create a virtual environment(venv)

For Windows: 
```bash
python -m venv venv
venv/scripts/activate
```

For Mac:
```bash
python3 -m venv venv
source venv/bin/activate
```

then,
```bash
pip install -r requirements.txt
python app.py
```

### Setup Frontend

```bash
cd client
npm install
npm run dev
```

### Add `.env` with your API Keys

```env
GEMINI_API_KEY=your_gemini_key
TOGETHER_AI_API_KEY=your_together_key
IMGBB_API_KEY=your_imgbb_key
```

### Add the inswapper_128.onnx file to controllers folder in the server

---

## Sample Output

### Option 1 Output

A scene from a stroy which is generated from a set of images uploaded:
![Image](https://github.com/user-attachments/assets/19a62055-58ab-4e28-92db-b45471fda52e)

### Option 2 Output

A scene from the Iron man story where the Iron man character is swapped by me 🙂:
![Image](https://github.com/user-attachments/assets/66c97fd8-a2fc-4d16-afea-45282c9d54a0)

---

## Future Scope

* Mobile App Integration
* Voice Narration of Stories
* Multilingual Support
* Child Safety Filtering
* Educational Story Templates

---

## Contributing

PRs are welcome! Feel free to fork the repo and submit improvements. For major changes, please open an issue first.

---

## Authors & Credits

Made with ❤️ by [katakampranav](https://github.com/katakampranav)

---


