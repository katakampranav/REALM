import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const genres = ["Fantasy", "Adventure", "Mystery", "Sci-Fi", "Educational"];
const tones = ["Funny", "Serious", "Whimsical", "Dark"];
const settings = ["Modern", "Ancient", "Futuristic", "Magical"];

const CreateStory = () => {
  const containerRef = useRef();
  const [uploadedImages, setUploadedImages] = useState([]);

  useGSAP(() => {
    gsap.from(".fade-in", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedImages(files);
  };

  return (
    <div className="min-h-screen w-screen bg-black text-blue-50 px-6 py-20" ref={containerRef}>
      <div className="text-center mb-10">
        <AnimatedTitle title="Craft Your Story <b>Visually</b>" />
        <p className="mt-4 text-sm text-blue-100">
          Upload images. Pick your mood. Watch AI build your unique adventure.
        </p>
      </div>

      {/* Upload Images */}
      <div className="fade-in mb-10 border border-blue-200 border-dashed p-10 rounded-lg bg-[#151515]">
        <p className="mb-3 font-semibold">📁 Drag & drop or upload images</p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="w-full"
        />
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {uploadedImages.map((img, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(img)}
              alt={`preview-${idx}`}
              className="h-32 w-full object-cover rounded shadow"
            />
          ))}
        </div>
      </div>

      {/* Dropdowns */}
      <div className="fade-in grid md:grid-cols-2 gap-6 mb-10">
        <div>
          <label>🎭 Genre</label>
          <select className="w-full p-2 mt-1 bg-[#202020] text-white rounded">
            {genres.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label>🎨 Tone</label>
          <select className="w-full p-2 mt-1 bg-[#202020] text-white rounded">
            {tones.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label>🏰 Setting</label>
          <select className="w-full p-2 mt-1 bg-[#202020] text-white rounded">
            {settings.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label>📚 Number of Scenes</label>
          <input
            type="number"
            min={1}
            max={10}
            defaultValue={5}
            className="w-full p-2 mt-1 bg-[#202020] text-white rounded"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="fade-in text-center">
        <Button title="✨ Generate My Storybook" containerClass="bg-yellow-300 text-black" />
      </div>
    </div>
  );
};

export default CreateStory;
