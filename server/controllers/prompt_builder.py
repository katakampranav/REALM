def build_swapping_image_prompt(scene: str, protagonist: str) -> str:
            """Converts a scene into a vivid, image-generation-friendly prompt with strict face-swapping constraints."""

            return f"""
                You are a prompt engineer for an AI image generation system (like DALL·E, Stable Diffusion, or FLUX). 
                Your goal is to rewrite a scene into a **highly descriptive visual prompt** optimized for **face-swapping use cases** but the story line and scene shouldn't be disturbed.

                🎯 Follow these strict guidelines:

                1. The **main character ({protagonist})** must be in clear focus:
                - Facing the camera directly or at a slight angle.
                - Face must be well-lit, **unobstructed**, **natural**, and **centered**.
                - No shadows, hats, or masks covering the face.

                2. All **supporting characters**:
                - Must **NOT face the camera** at all.
                - Simply there face shouldn't be in scope of camera.
                - Their faces should be **blurred completely**, **turned away**, or **completely hidden** by props/backgrounds so that there will be no scope for swapping other characters faces.
                - They must never block or overlap with {protagonist}.
                - But they should play the role they were given according to the story.

                3. Avoid unnatural or ghostly body postures:
                - The protagonist’s body should face forward or slightly turned.
                - No back-facing shots or "face turned backward" anomalies.

                4. Use cinematic detail:
                - Include environment, lighting (e.g., warm afternoon sunlight, castle shadows), facial expressions (e.g., confident, frightened), and specific actions.
                - Style must be **storybook-realistic** (not surreal or abstract).

                5. The image should strictly depict the scene provided along with {protagonist} face shown clearly for face swapping.

                Now rewrite this scene:

                \"\"\"{scene}\"\"\"

                into a single vivid, photorealistic prompt based on the above rules:
            """

def build_image_prompt(scene_title, scene_description):
        """Generates an image using Together AI based on scene text."""
        return f'''Create a highly detailed, vibrant storybook-style illustration depicting the following scene title: {scene_title} and scene description: {scene_description}. 
                   The illustration should visually convey the emotions, characters, and setting without any text or titles. 
                   Maintain a consistent art style and character design across all images in the story. 
                   Use rich, expressive colors to match the scene’s emotional tone, ensuring a balanced composition with clear foreground, midground, and background elements. 
                   The image should have clean lines, natural lighting, and immersive environmental details that enhance the storytelling without overwhelming the focal point. 
                   The final result should resemble a professional, hand-painted storybook illustration, making the scene immediately recognizable and visually captivating.'''