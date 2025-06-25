import { useRouter } from "next/router";
import LetterGlitch from "../components/LetterGlitch"; // Import the glitch effect

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-black">
      {/* Glitch Background Effect */}
      <LetterGlitch 
        glitchSpeed={50} 
        centerVignette={true} 
        outerVignette={false} 
        smooth={true} 
      />

      {/* 404 Error Message */}
      <div className="absolute bg-white/10 p-10 rounded-lg text-center text-white backdrop-blur-md shadow-lg">
        <h1 className="text-6xl font-bold">Page Not Found !</h1>
        <p className="text-xl mt-4">Oops! The page you're looking for doesn't exist.</p>

        {/* Go Back Home Button */}
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
