import { useState } from "react";
import { useRouter } from "next/router";
import ImageComponent from "../components/ImageComponent"; // ✅ Import Image Component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons"; // ✅ Import faGoogle correctly
import Marquee from 'react-fast-marquee';

export default function SignupForm({ onGoogleSignup }) {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    confirmEmailOrPhone: "",
    password: "",
    gender: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderSelect = (gender) => {
    setFormData({ ...formData, gender });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Signup successful!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-lg overflow-hidden relative">

        {/* ✅ Use Image Component with Local Image Path */}
        <ImageComponent 
  imagePath="/images/img.png" // ✅ Image from /public/images
  heading={
    <>
      <Marquee gradient={false} speed={100} direction="right">
        <div className="text-center">
          Your Dream Home Awaits
        </div>
      </Marquee>
      <Marquee gradient={false} speed={100} direction="left">
        <div className="text-center">
          Start Your Journey Today!
        </div>
      </Marquee>
    </>
  }
/>

        {/* ✅ Signup Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8 bg-blue-900 relative">
          
          {/* ❌ Close Button */}
          <button
            onClick={() => router.push("/")}
            className="absolute top-4 right-4 text-white text-xl hover:text-gray-300"
          >
            ✖
          </button>

          {/* 📝 Sign Up Form */}
          <h2 className="text-2xl font-bold text-center text-white mb-4">
            Sign Up
          </h2>

          {/* 🔥 Google Sign Up Button */}
         <button
  onClick={onGoogleSignup}
  className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 active:bg-red-800 focus:outline-none space-x-2"
>
  <FontAwesomeIcon icon={faGoogle} className="mr-2 text-xl" /> {/* ✅ Google Icon Fixed */}
  <span>Continue with Google</span>
</button>

          <div className="text-center text-white my-4">or</div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Email or Mobile Number"
              value={formData.emailOrPhone}
              onChange={handleChange}
              className="w-full p-2 bg-transparent border-b border-white placeholder-white text-white outline-none"
              required
            />
            <input
              type="text"
              name="confirmEmailOrPhone"
              placeholder="Confirm Email or Mobile Number"
              value={formData.confirmEmailOrPhone}
              onChange={handleChange}
              className="w-full p-2 bg-transparent border-b border-white placeholder-white text-white outline-none"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 bg-transparent border-b border-white placeholder-white text-white outline-none"
              required
            />

            {/* 🚻 Fixed Gender Selection */}
            <div className="text-white font-semibold">
              <p className="mb-1">Gender</p>
              <div className="flex border border-white rounded-md divide-x divide-white">
                {["Male", "Female", "Other"].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => handleGenderSelect(gender)}
                    className={`flex-1 text-center py-2 font-semibold transition-colors duration-200
                      ${formData.gender === gender ? "bg-gray-300 text-black" : "bg-transparent text-white"}
                    `}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              name="description"
              placeholder="Enter brief description"
              className="w-full p-2 bg-transparent border border-white placeholder-white text-white rounded-md outline-none"
            />

            <p className="text-sm text-white">
              By clicking Sign up, you agree to our{" "}
              <a href="#" className="text-yellow-400">Terms and Conditions</a>.
            </p>

            <button type="submit" className="w-full bg-white text-blue-900 font-semibold py-2 rounded-md mt-2">
              Sign Up
            </button>
          </form>

          {/* 🔄 Back to Login */}
          <div className="text-center mt-4">
            <a onClick={() => router.push("/")} className="text-white cursor-pointer hover:underline">
              ← Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
