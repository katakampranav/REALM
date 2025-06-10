import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Option2 from "./components/Option2";
import Option1 from "./components/Option1";
import Contact from "./components/Contact";
import Choice1 from "./pages/Choice1";
import Choice2 from "./pages/Choice2";
import Choice1Story from "./pages/Choice1Story";
import Choice2Story from "./pages/Choice2Story";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <main className="relative min-h-screen w-screen overflow-x-hidden">
          <NavBar />
          <Hero />
          <About />
          <Features />
          <Option1 />
          <Option2 />
          <Contact />
        </main>
      } />
        <Route path="/choice1" element={<Choice1 />} />
        <Route path="/choice1-story" element={<Choice1Story />} />
        <Route path="/choice2" element={<Choice2 />} />
        <Route path="/choice2-story" element={<Choice2Story />} />
    </Routes>
  );
}

export default App;
