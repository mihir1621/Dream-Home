import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import TrueFocus from "@/components/TrueFocus";
import OurServices from "@/components/OurServices";
import ImageComponent from "@/components/ImageComponent";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [confirmResetPassword, setConfirmResetPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const searchRef = useRef(null);
  const searchOptions = ["Residential", "Commercial", "PGs", "Plot/Land"];
  const [hoveredOption, setHoveredOption] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      alert("Please enter your email.");
      return;
    }
    setIsForgotPassword("reset");
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (resetPassword !== confirmResetPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password reset successful!");
    setIsLoginOpen(false);
    setIsForgotPassword(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsActive(false);
        setHoveredOption(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Navbar setIsLoginOpen={setIsLoginOpen} isLoginOpen={isLoginOpen} />
      <div className="min-h-screen bg-gray-50 relative">
        {/* Hero Section - Improved responsive design */}
        <header className={`relative flex flex-col items-center justify-center h-[50vh] sm:h-[60vh] md:h-[70vh] text-center bg-cover bg-center bg-[url('/hero.jpg')] ${isLoginOpen ? "blur-sm" : ""}`}>
          <div className="absolute inset-0 bg-blue-300 bg-opacity-50"></div>
          <div className={`relative z-10 px-4 ${isLoginOpen ? "opacity-50" : ""}`}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white flex flex-col sm:flex-row justify-center items-center">
              <TrueFocus
                sentence="Find Your Dream Home"
                blurAmount={5}
                animationDuration={1}
                pauseBetweenAnimations={0}
              />
            </h1>
            {!isLoginOpen && (
              <p className="mt-2 text-base sm:text-lg text-gray-50 max-w-lg mx-auto">
                Buy, Sell, Rent & Discover the best properties near you.
              </p>
            )}
          </div>

          {/* Search Bar - Improved responsive design */}
          <div className="absolute bottom-4 w-full flex items-center justify-center px-4">
            <div
              ref={searchRef}
              className={`relative flex flex-col items-center bg-gray-400 rounded-full transition-all duration-700 ease-in-out ${
                isActive ? "w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto sm:h-14 px-3 py-2" : "w-10 sm:w-12 h-10 justify-end"
              }`}
            >
              {/* Top row: Search Input & Button */}
              <div className="flex items-center w-full">
                {/* Search Input */}
                <input
                  type="text"
                  placeholder={isActive ? "Search for properties..." : ""}
                  className={`text-[#1e272e] bg-transparent border-none focus:outline-none rounded-full transition-all duration-700 ease-in-out ${
                    isActive ? "w-full px-2 sm:px-4 py-2 opacity-100 cursor-text text-sm sm:text-base" : "w-0 opacity-0 cursor-pointer"
                  }`}
                />

                {/* Search Icon (When Closed) */}
                {!isActive && (
                  <button
                    className="w-10 sm:w-12 h-10 flex items-center justify-center text-[#2c2d2e] focus:outline-none transition duration-500 ease-in-out hover:bg-gray-500 hover:text-white rounded-full"
                    onClick={() => setIsActive(true)}
                  >
                    <i className="fas fa-search text-base sm:text-lg"></i>
                  </button>
                )}

                {/* Search Button (When Open) */}
                {isActive && (
                  <button className="ml-1 sm:ml-2 px-1 sm:px-2 py-1 sm:py-2 text-sm sm:text-base font-bold bg-gray-500 rounded-full hover:text-gray-600 transition">
                    Search
                  </button>
                )}
              </div>

              {/* Bottom row: Search Options inside the bar - Improved for responsiveness */}
              {isActive && (
                <div className="mt-1 w-full flex flex-wrap justify-center gap-1 sm:gap-2 text-black text-xs sm:text-sm nav-container">
                  {searchOptions.map((option, index) => (
                    <div
                      key={index}
                      className="nav-item relative px-2 sm:px-3 md:px-5 py-1 sm:py-2 md:py-4 cursor-pointer hover:text-blue-200 transition"
                      onMouseEnter={() => setHoveredOption(option)}
                      onMouseLeave={() => setHoveredOption(null)}
                    >
                      {option}
                      {/* Pop-up effect on the upper side */}
                      {hoveredOption === option && (
                        <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-lg shadow-md whitespace-nowrap">
                          {option}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Our Services Section - Added padding and responsive text sizing */}
        <div className="mt-8 sm:mt-10 md:mt-12 px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">Our Services</h1>
          <OurServices />
        </div>

        {/* Footer - Added more padding for better spacing */}
        <footer className="py-4 sm:py-6 text-center bg-gray-900 text-gray-300">
          <p>© {new Date().getFullYear()} DreamHome. All Rights Reserved.</p>
        </footer>

        {/* Login Modal - Improved responsiveness */}
        {isLoginOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-20 p-4">
            <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden relative">
              {/* Left Side: Image Section - Made responsive */}
              <div className="relative w-full md:w-1/2 h-48 sm:h-64 md:h-auto flex justify-stretch overflow-hidden">
                <ImageComponent imagePath="/images/loginform.png" className="w-full h-full object-cover block" />
              </div>

              {/* Right Side: Login Form Section - Improved spacing */}
              <div className="w-full md:w-1/2 flex flex-col justify-center p-4 sm:p-6 md:p-8 bg-blue-900 bg-opacity-80 relative">
                <button
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white text-lg sm:text-xl hover:text-gray-300"
                  onClick={() => {
                    setIsLoginOpen(false);
                    setIsForgotPassword(false);
                  }}
                >
                  ✖
                </button>

                {/* Login Form */}
                {!isForgotPassword && (
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-black">Login</h2>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-black">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 sm:px-4 py-1 sm:py-2 border rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-black">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 sm:px-4 py-1 sm:py-2 border rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                        placeholder="Enter your password"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
                      <button
                        type="submit"
                        className="w-full sm:w-1/2 px-3 sm:px-4 py-1 sm:py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-bold sm:mr-2 text-sm"
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        className="w-full sm:w-1/2 px-3 sm:px-4 py-1 sm:py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-bold text-sm"
                        onClick={() => setIsForgotPassword("email")}
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-center text-black">
                      Don't have an account?{" "}
                      <button
                        onClick={() => router.push("/signup")}
                        className="text-blue-600 hover:underline"
                      >
                        Sign Up
                      </button>
                    </p>
                  </form>
                )}

                {/* Forgot Password Form */}
                {isForgotPassword === "email" && (
                  <form onSubmit={handleForgotPasswordSubmit} className="space-y-3 sm:space-y-4">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-black">Forgot Password</h2>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-1 sm:py-2 border rounded-lg text-black bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                      placeholder="Enter your email"
                    />
                    <button
                      type="submit"
                      className="w-full px-3 sm:px-4 py-1 sm:py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-bold text-sm"
                    >
                      Proceed
                    </button>
                  </form>
                )}

                {/* Reset Password Form */}
                {isForgotPassword === "reset" && (
                  <form onSubmit={handleResetPasswordSubmit} className="space-y-3 sm:space-y-4">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-black">Reset Password</h2>
                    <input
                      type="password"
                      value={resetPassword}
                      onChange={(e) => setResetPassword(e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-1 sm:py-2 border rounded-lg text-black bg-white placeholder-black text-sm"
                      placeholder="New Password"
                    />
                    <input
                      type="password"
                      value={confirmResetPassword}
                      onChange={(e) => setConfirmResetPassword(e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-1 sm:py-2 border rounded-lg text-black bg-white placeholder-black text-sm"
                      placeholder="Confirm Password"
                    />
                    <button className="w-full px-3 sm:px-4 py-1 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold text-sm">
                      Reset Password
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}