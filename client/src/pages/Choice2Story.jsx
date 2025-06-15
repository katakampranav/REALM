import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useLocation, useNavigate } from "react-router-dom"
import { FiMenu, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { TiLocationArrow } from "react-icons/ti"
import Button from "../components/Button"

gsap.registerPlugin(ScrollTrigger)

const Choice2Story = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { storybook, protagonist } = location.state || {}

  // Loading states
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Story states
  const [currentScene, setCurrentScene] = useState(0)
  const [showContents, setShowContents] = useState(false)

  const storyRef = useRef(null)
  const scenesRef = useRef([])
  const backgroundRef = useRef(null)

  // Load story with progress animation
  useEffect(() => {
    const loadStory = async () => {
      // Smooth progress animation using GSAP
      gsap.to(
        { progress: 0 },
        {
          progress: 100,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: function () {
            setLoadingProgress(Math.round(this.targets()[0].progress))
          },
          onComplete: () => {
            setTimeout(() => {
              setIsLoading(false)
            }, 500)
          },
        },
      )
    }

    if (storybook) {
      loadStory()
    }
  }, [storybook])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isLoading || showContents || !storybook) return

      if (e.key === "ArrowLeft" && currentScene > 0) {
        navigateToScene(currentScene - 1)
      } else if (e.key === "ArrowRight" && currentScene < storybook.length - 1) {
        navigateToScene(currentScene + 1)
      } else if (e.key === "Escape") {
        setShowContents(false)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentScene, isLoading, showContents, storybook])

  // Navigate to specific scene
  const navigateToScene = (sceneIndex) => {
    setCurrentScene(sceneIndex)
    const sceneElement = scenesRef.current[sceneIndex]
    if (sceneElement) {
      sceneElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  // Update current scene based on scroll position
  useEffect(() => {
    if (isLoading || !storybook) return

    const updateCurrentScene = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      scenesRef.current.forEach((scene, index) => {
        if (scene) {
          const rect = scene.getBoundingClientRect()
          const sceneTop = rect.top + scrollY
          const sceneBottom = sceneTop + rect.height

          if (scrollY + windowHeight / 2 >= sceneTop && scrollY + windowHeight / 2 <= sceneBottom) {
            setCurrentScene(index)
          }
        }
      })
    }

    window.addEventListener("scroll", updateCurrentScene)
    return () => window.removeEventListener("scroll", updateCurrentScene)
  }, [isLoading, storybook])

  // GSAP Animations
  useGSAP(() => {
    // Animated background gradient
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        backgroundPosition: "200% 200%",
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
      })
    }

    if (isLoading) {
      // Loading animations
      gsap.fromTo(
        ".loading-content",
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" },
      )

      // Subtle floating animation for loading elements
      gsap.to(".loading-float", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    } else {
      // Story reveal animation
      gsap.fromTo(".story-container", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })

      // Animate scenes on scroll
      scenesRef.current.forEach((scene) => {
        if (scene) {
          gsap.fromTo(
            scene,
            { opacity: 0, y: 50, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: scene,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play none none reverse",
              },
            },
          )

          // Add subtle pulse animation to images
          const sceneImage = scene.querySelector(".scene-image")
          if (sceneImage) {
            gsap.to(sceneImage, {
              scale: 1.02,
              duration: 3,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
            })
          }
        }
      })
    }
  }, [isLoading, loadingProgress])

  // Handle no story case
  if (!storybook && !isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 p-8 text-white">
        <h1 className="mb-6 text-4xl font-bold">No Story Found</h1>
        <p className="mb-8 text-xl">
          It seems the story data is missing. Please try generating a story again.
        </p>
        <Button
          title="Back to Story Maker"
          containerClass="bg-violet-600 hover:bg-violet-500 px-8 py-3 rounded-lg shadow-lg"
          onClick={() => navigate("/choice2")}
        />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="relative min-h-screen w-screen overflow-hidden bg-[#050505]">
        {/* Animated gradient background */}
        <div
          ref={backgroundRef}
          className="absolute inset-0"
          style={{
            backgroundSize: "400% 400%",
            backgroundImage: "linear-gradient(45deg, #000000, #0a0a0a, #111111, #0a0a0a, #000000)",
          }}
        />

        {/* Subtle animated overlay */}
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-violet-300/5 via-transparent to-violet-300/5" />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <div className="loading-content mx-auto max-w-lg space-y-8 text-center">
            {/* Minimalist loading icon */}
            <div className="loading-float relative">
              <div className="relative mx-auto mb-8 size-20">
                <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-violet-300 border-t-transparent"></div>
                <div className="absolute inset-3 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
                  <div className="size-2 animate-pulse rounded-full bg-violet-300"></div>
                </div>
              </div>
            </div>

            {/* Clean loading text */}
            <div className="space-y-4">
              <h2 className="font-general text-4xl text-blue-50">Crafting Your Story</h2>
              <p className="font-circular-web text-lg text-blue-50/70">Generating immersive narrative experience...</p>
            </div>

            {/* Sleek progress bar */}
            <div className="space-y-3">
              <div className="flex justify-between font-general text-sm text-blue-50/60">
                <span>Processing</span>
                <span>{loadingProgress}%</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10 backdrop-blur-sm">
                <div
                  className="h-full rounded-full bg-violet-50 transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>

            {/* Sophisticated loading status */}
            <div className="text-center">
              <p className="font-circular-web text-sm text-blue-50/50">
                {loadingProgress < 25 && "Analyzing narrative structure..."}
                {loadingProgress >= 25 && loadingProgress < 50 && "Generating story elements..."}
                {loadingProgress >= 50 && loadingProgress < 75 && "Crafting immersive scenes..."}
                {loadingProgress >= 75 && loadingProgress < 95 && "Finalizing experience..."}
                {loadingProgress >= 95 && "Ready to begin..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const totalScenes = storybook.length

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div
        ref={backgroundRef}
        className="fixed inset-0"
        style={{
          backgroundSize: "400% 400%",
          backgroundImage: "linear-gradient(45deg, #000000, #0a0a0a, #111111, #0a0a0a, #000000)",
        }}
      />

      {/* Subtle moving overlay */}
      <div className="fixed inset-0 animate-pulse bg-gradient-to-r from-violet-300/5 via-transparent to-violet-300/5" />

      {/* Header with back navigation */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 px-4 backdrop-blur-md lg:px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
          >
            <img src="/img/logo.png" alt="logo" className="w-16" />
          </button>
        </div>
      </header>

      {/* Contents Button */}
      <button
        onClick={() => setShowContents(true)}
        className="border-hsla fixed right-6 top-6 z-50 rounded-full bg-black/50 p-4 text-blue-50 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-black/70"
      >
        <FiMenu className="size-5" />
      </button>

      {/* Navigation Arrows */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-3">
        <button
          onClick={() => currentScene > 0 && navigateToScene(currentScene - 1)}
          disabled={currentScene === 0}
          className="border-hsla rounded-full bg-black/50 p-4 text-blue-50 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <FiChevronLeft className="size-5" />
        </button>
        <button
          onClick={() => currentScene < totalScenes - 1 && navigateToScene(currentScene + 1)}
          disabled={currentScene === totalScenes - 1}
          className="border-hsla rounded-full bg-black/50 p-4 text-blue-50 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <FiChevronRight className="size-5" />
        </button>
      </div>

      {/* Story Container */}
      <div ref={storyRef} className="story-container relative z-10">
        {/* Story Header */}
        <div className="relative flex min-h-screen items-center justify-center px-6">
          <div className="border-hsla mx-auto max-w-5xl rounded-3xl bg-black/20 p-16 text-center shadow-2xl backdrop-blur-xl">
            <h1 className="special-font mb-8 font-zentry text-6xl font-black uppercase leading-[.8] text-blue-50 md:text-8xl">
              {protagonist}`s <b>A</b>dventure
            </h1>
            <p className="mb-10 font-circular-web text-xl text-blue-50/80">A unique tale crafted just for you</p>
            <div className="flex items-center justify-center gap-8 font-general text-base uppercase text-blue-50/60">
              <span className="flex items-center gap-2">{totalScenes} Scenes</span>
              <span className="text-violet-300">•</span>
              <span className="flex items-center gap-2">AI Generated</span>
            </div>
            <div className="mt-16">
              <div className="animate-bounce">
                <svg
                  className="mx-auto size-8 text-violet-300 opacity-60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Story Scenes */}
        <div className="container mx-auto px-3 py-20 md:px-10">
          {storybook.map((scene, index) => (
            <div
              key={`scene-${index}`}
              ref={(el) => (scenesRef.current[index] = el)}
              className={`mb-32 ${index === storybook.length - 1 ? "mb-0" : ""}`}
            >
              <div
                className={`grid items-center gap-16 lg:grid-cols-2 ${
                  index % 2 === 0 ? "lg:grid-flow-col" : "lg:grid-flow-col-dense"
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="border-hsla relative aspect-[4/3] overflow-hidden rounded-md bg-black/20 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out hover:scale-[1.02]">
                    <img
                      src={scene.swapped_image_url}
                      alt={`Scene ${scene.scene_number}`}
                      className="scene-image size-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Available"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Scene Number */}
                  <div className="absolute -left-4 -top-4 flex size-12 items-center justify-center rounded-full border-4 border-black bg-violet-50 shadow-xl">
                    <span className="font-zentry text-lg font-black text-black">{scene.scene_number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-8 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="border-hsla rounded-md bg-black/40 p-10 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out hover:scale-[1.02]">
                    <div className="space-y-6">
                      <h2 className="bento-title special-font font-zentry font-black uppercase text-blue-50">
                        Scene {scene.scene_number}
                      </h2>
                      <div className="h-px w-16 bg-violet-50" />
                    </div>

                    <p className="mt-8 font-circular-web text-lg leading-relaxed text-blue-50/80 whitespace-pre-line">
                      {scene.scene_text}
                    </p>

                    {/* Scene Metadata */}
                    <div className="mt-8 flex items-center gap-6 border-t border-white/20 pt-6 font-general text-sm uppercase text-blue-50/50">
                      <span className="flex items-center gap-2">Scene {scene.scene_number}</span>
                      <span className="text-violet-300">•</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Story End */}
        <div className="px-6 py-20 text-center">
          <div className="border-hsla mx-auto max-w-3xl space-y-10 rounded-md bg-black/40 p-16 shadow-2xl backdrop-blur-xl">
            <h3 className="special-font font-zentry text-4xl font-black uppercase text-blue-50">
              The <b>E</b>nd
            </h3>
            <p className="font-circular-web text-lg text-blue-50/80">
              Thank you for experiencing this narrative journey
            </p>
            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <Button
                title="Create Another Story"
                containerClass="bg-violet-50 text-black font-general text-xs uppercase"
                onClick={() => navigate("/choice2")}
              />
              <Button
                title="Share Story"
                containerClass="border-hsla bg-yellow-300 text-black font-general text-xs uppercase"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${protagonist}'s Adventure`,
                      text: "Experience this immersive AI-generated story",
                      url: window.location.href,
                    })
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contents Modal */}
      {showContents && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
          <div className="border-hsla max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-md bg-black/70 shadow-2xl backdrop-blur-xl">
            <div className="border-b border-white/20 p-8">
              <div className="flex items-center justify-between">
                <h3 className="special-font font-zentry text-2xl font-black uppercase text-blue-50">
                  Story <b>C</b>ontents
                </h3>
                <button
                  onClick={() => setShowContents(false)}
                  className="p-2 text-blue-50/60 transition-colors hover:text-blue-50"
                >
                  <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-8">
              <div className="space-y-3">
                {storybook.map((scene, index) => (
                  <button
                    key={`contents-${index}`}
                    onClick={() => {
                      navigateToScene(index)
                      setShowContents(false)
                    }}
                    className={`w-full rounded border p-6 text-left transition-all duration-300 ${
                      currentScene === index
                        ? "border-violet-300/50 bg-violet-300/20 text-blue-50"
                        : "border-hsla bg-black/20 text-blue-50/80 hover:bg-black/40"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex size-10 items-center justify-center rounded-full font-zentry text-sm font-black ${
                          currentScene === index ? "bg-violet-50 text-black" : "bg-white/10 text-blue-50"
                        }`}
                      >
                        {scene.scene_number}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-zentry text-lg font-black uppercase">Scene {scene.scene_number}</h4>
                        <p className="line-clamp-2 font-circular-web text-sm opacity-70">
                          {scene.scene_text.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Choice2Story