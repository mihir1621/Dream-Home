import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import TrueFocus from "@/components/TrueFocus"; // Ensure TrueFocus.js exists in /components

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div>
      <Navbar />
      <div className={`min-h-screen bg-gray-50 relative`}>
        {/* Navbar with Centered Login Button */}
        <nav className="fixed top-4 right-4 bg-gray-400 shadow-lg px-4 py-2 rounded-lg z-50">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Login
          </button>
        </nav>

        {/* Content Wrapper */}
        <div className={`${isLoginOpen ? "blur-sm" : ""} transition-all duration-300`}>
          {/* Hero Section */}
          <header className="relative flex flex-col items-center justify-center h-[60vh] text-center bg-cover bg-center bg-[url('/hero.jpg')]">
            <div className="absolute inset-0 bg-blue-300 bg-opacity-50"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                <TrueFocus
                  sentence="Find Your Dream Home"
                  blurAmount={2}
                  borderColor="white"
                  animationDuration={1.5}
                  pauseBetweenAnimations={1}
                  textColor="white" // Ensure TrueFocus component supports textColor prop
                />
              </h1>
              {!isLoginOpen && (
                <p className="mt-2 text-lg text-gray-200">
                  Buy, Sell, Rent & Discover the best properties near you.
                </p>
              )}
            </div>
          </header>

          {/* Search Bar */}
          <div className="flex justify-center -mt-10">
            <input
              type="text"
              placeholder="Search for properties..."
              className="w-3/4 sm:w-1/2 px-4 py-3 rounded-lg shadow-md border focus:outline-none text-black"
            />
          </div>

          {/* Property Categories */}
          <section className="py-12 px-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-black">Explore Properties</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { name: "Buy", img: "/buy.jpg" },
                { name: "Rent", img: "/rent.jpg" },
                { name: "PG/Hostel", img: "/pg.jpg" },
                { name: "Coliving", img: "/coliving.jpg" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={150}
                    height={150}
                    className="rounded-lg shadow-md"
                  />
                  <h3 className="mt-2 font-medium text-black">{item.name}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="py-6 text-center bg-gray-900 text-gray-300">
            <p>© {new Date().getFullYear()} DreamHome. All Rights Reserved.</p>
          </footer>
        </div>

        {/* Login Modal */}
        {isLoginOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsLoginOpen(false)}
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold mb-4 text-black">Login</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700"
                >
                  Login
                </button>
                <p className="text-sm text-center text-black">
                  Don't have an account?{" "}
                  <Link href="/signup">
                    <a className="text-blue-400 hover:underline">Sign up</a>
                  </Link>
                </p>
                <div className="text-center">
                  <Link href="/" className="px-4 py-2 text-black hover:underline">
                    ← Back to Home
                  </Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
