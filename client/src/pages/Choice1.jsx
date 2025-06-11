import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import axios from "axios";
import Button from "../components/Button";
import Select from "react-select";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Choice1 = () => {
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const totalVideos = 1;
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [preferences, setPreferences] = useState({
    genre: "adventure",
    tone: "cheerful",
    setting: "present",
    length: 3,
  });

  const preferencesRef = useRef(null);
  const uploadRef = useRef(null);

  // Options for react-select
  const genreOptions = [
    { value: "adventure", label: "Adventure" },
    { value: "fantasy", label: "Fantasy" },
    { value: "mystery", label: "Mystery" },
    { value: "romance", label: "Romance" },
    { value: "scifi", label: "Science Fiction" },
    { value: "horror", label: "Horror" },
  ];

  const toneOptions = [
    { value: "cheerful", label: "Cheerful" },
    { value: "scary", label: "Scary" },
    { value: "mysterious", label: "Mysterious" },
    { value: "dramatic", label: "Dramatic" },
    { value: "humorous", label: "Humorous" },
    { value: "melancholic", label: "Melancholic" },
  ];

  const settingOptions = [
    { value: "ancient times", label: "Ancient Times" },
    { value: "present", label: "Present" },
    { value: "futuristic", label: "Futuristic" },
  ];

  // Custom styles for react-select
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#444",
      color: "#fff",
      borderColor: state.isFocused ? "#6c47ff" : "#606060",
      boxShadow: state.isFocused ? "0 0 0 1px #6c47ff" : "none",
      "&:hover": {
        borderColor: "#6c47ff",
      },
      padding: "0.25rem",
      borderRadius: "0.5rem",
      cursor: "pointer",
      backdropFilter: "blur(4px)",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#ccc",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#444",
      borderRadius: "0.5rem",
      border: "1px solid #606060",
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#6c47ff"
        : state.isSelected
          ? "#555"
          : "#444",
      color: "#fff",
      "&:active": {
        backgroundColor: "#6c47ff",
      },
      cursor: "pointer",
    }),
  };

  // Video player handlers
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos) {
      setLoading(false);
    }
  }, [loadedVideos]);

  // Story creation handlers
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = files.map((file) => URL.createObjectURL(file));
      setUploadedImages((prev) => [...prev, ...newImages]);
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const newImages = files.map((file) => URL.createObjectURL(file));
      setUploadedImages((prev) => [...prev, ...newImages]);
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  const removeImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

const handleGenerate = async () => {
  if (uploadedFiles.length === 0) return;

  setIsLoading(true);

  try {
    const formData = new FormData();
    
    // Append each file separately with the same field name 'images'
    uploadedFiles.forEach((file) => {
      formData.append('images', file);
    });
    
    // Append other fields
    formData.append('tone', preferences.tone);
    formData.append('genre', preferences.genre);
    formData.append('setting', preferences.setting);
    formData.append('num_scenes', preferences.length.toString()); // Note: Changed to match your backend

    // Debug: Create an object to inspect the FormData
    const formDataObj = {};
    for (let [key, value] of formData.entries()) {
      if (key === 'images') {
        if (!formDataObj[key]) formDataObj[key] = [];
        formDataObj[key].push(value.name);
      } else {
        formDataObj[key] = value;
      }
    }
    console.log("FormData contents:", formDataObj);

    const response = await axios.post(
      "http://127.0.0.1:5000/generate_story",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // Add withCredentials if needed
        // withCredentials: true,
      }
    );

    console.log("Full response:", response);
    
    if (response.data.success) {
      navigate("/choice1-story", { state: { story: response.data.story } });
    } else {
      throw new Error(response.data.error || "Failed to generate story");
    }
  } catch (error) {
    console.error("Story generation failed:", error);
    console.error("Error details:", error.response?.data || error.message);
    alert(`Story generation failed: ${error.response?.data?.message || error.message}`);
  } finally {
    setIsLoading(false);
  }
};

  // GSAP animations
  useGSAP(() => {
    // Remove video frame animation
    gsap.set("#video-frame", {
      clipPath: "none",
      borderRadius: "0",
    });

    // Animate the preferences section
    gsap.from(preferencesRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: preferencesRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });

    // Animate the upload section
    gsap.from(uploadRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: uploadRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });

    // Animate the heading
    gsap.from(".story-heading", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  const getVideoSrc = () => `videos/choice-1.mp4`;

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-black">
      {/* Video Player Section */}
      <div className="fixed inset-0 h-screen w-screen">
        {loading && (
          <div className="flex-center fixed inset-0 z-[100] h-screen w-screen overflow-hidden bg-violet-50">
            <div className="three-body">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
          </div>
        )}

        <div
          id="video-frame"
          className="relative z-10 h-screen w-screen overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 z-10 bg-white/10 mix-blend-overlay"></div>
            <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/30 to-black/50"></div>
            <video
              ref={videoRef}
              src={getVideoSrc()}
              autoPlay
              loop
              muted
              playsInline
              className="contrast-110 absolute inset-0 size-full object-cover brightness-110"
              onLoadedData={handleVideoLoad}
            />
          </div>
        </div>
      </div>

      {/* Story Creation Section */}
      <div className="relative z-20 min-h-screen w-screen bg-gradient-to-b from-black/30 via-black/40 to-black/50 backdrop-blur-[1px]">
        <header className="flex h-16 items-center justify-between border-b border-white/10 px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
            >
              <img src="/img/logo.png" alt="logo" className="w-16" />
            </button>
          </div>
        </header>

        <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
          <div className="mx-auto w-full max-w-4xl space-y-8">
            <div className="story-heading space-y-2 text-center">
              <h1 className="text-4xl font-bold tracking-tighter text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] sm:text-5xl">
                🌟 Welcome to Your Magical Story Maker
              </h1>
              <p className="text-lg text-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                Upload images and set your preferences to generate a unique
                story
              </p>
            </div>

            {/* Upload Images Card */}
            <div
              ref={uploadRef}
              className="rounded-xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-white/20"
            >
              <div className="mb-6">
                <h2 className="mb-3 text-2xl font-semibold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                  Upload Images
                </h2>
                <p className="text-base text-gray-200">
                  Upload images that will be used to generate your story (max 5
                  images)
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                  {uploadedImages.map((image, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 shadow-lg transition-all duration-300 hover:border-white/20"
                    >
                      <img
                        src={image}
                        alt={`Uploaded image ${index + 1}`}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 rounded-full bg-red-500/80 p-1 text-white transition-all duration-300 hover:bg-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    </div>
                  ))}
                  {uploadedImages.length < 5 && (
                    <label
                      htmlFor="image-upload"
                      className="group flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/20 transition-all duration-300 hover:border-white/30 hover:bg-white/5"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <svg
                        className="size-10 text-white/60 transition-colors duration-300 group-hover:text-white/80"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="mt-3 text-base text-white/60 transition-colors duration-300 group-hover:text-white/80">
                        Upload Image
                      </span>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={uploadedImages.length >= 5}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Story Preferences Card */}
            <div
              ref={preferencesRef}
              className="rounded-xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-white/20"
            >
              <div className="mb-6">
                <h2 className="mb-3 text-2xl font-semibold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                  Story Preferences
                </h2>
                <p className="text-base text-gray-200">
                  Customize how your story will be generated
                </p>
              </div>
              <div className="grid gap-8">
                {/* Genre Select */}
                <div className="grid gap-3">
                  <label className="text-base font-medium text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                    Genre
                  </label>
                  <Select
                    options={genreOptions}
                    value={genreOptions.find(
                      (option) => option.value === preferences.genre
                    )}
                    onChange={(selectedOption) =>
                      setPreferences({
                        ...preferences,
                        genre: selectedOption.value,
                      })
                    }
                    styles={customSelectStyles}
                    classNamePrefix="react-select"
                  />
                </div>

                {/* Tone Select */}
                <div className="grid gap-3">
                  <label className="text-base font-medium text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                    Tone
                  </label>
                  <Select
                    options={toneOptions}
                    value={toneOptions.find(
                      (option) => option.value === preferences.tone
                    )}
                    onChange={(selectedOption) =>
                      setPreferences({
                        ...preferences,
                        tone: selectedOption.value,
                      })
                    }
                    styles={customSelectStyles}
                    classNamePrefix="react-select"
                  />
                </div>

                {/* Setting Select */}
                <div className="grid gap-3">
                  <label className="text-base font-medium text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                    Setting
                  </label>
                  <Select
                    options={settingOptions}
                    value={settingOptions.find(
                      (option) => option.value === preferences.setting
                    )}
                    onChange={(selectedOption) =>
                      setPreferences({
                        ...preferences,
                        setting: selectedOption.value,
                      })
                    }
                    styles={customSelectStyles}
                    classNamePrefix="react-select"
                  />
                </div>

                {/* Story Length Slider */}
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <label className="text-base font-medium text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                      Number of Scenes
                    </label>
                    <span className="text-base text-white/80">
                      {preferences.length}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="6"
                    step="1"
                    value={preferences.length}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        length: parseInt(e.target.value),
                      })
                    }
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-violet-500/80"
                  />
                  <div className="flex justify-between text-sm text-white/60">
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div className="mt-8">
                <Button
                  id="generate-story"
                  title={isLoading ? "Generating Story..." : "Generate Story"}
                  containerClass={`w-full ${uploadedImages.length === 0 ? "bg-gray-600 cursor-not-allowed" : "bg-violet-600/90 hover:bg-violet-500"} text-lg py-4 rounded-lg shadow-lg hover:shadow-violet-500/30 transition-all duration-300 backdrop-blur-sm`}
                  onClick={handleGenerate}
                  disabled={isLoading || uploadedImages.length === 0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choice1;
