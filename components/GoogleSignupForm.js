import { useState } from "react";
import { useRouter } from "next/router"; // ✅ Import useRouter
import { motion } from "framer-motion";

export default function GoogleSignupForm({ onClose }) {
  const router = useRouter(); // ✅ Initialize router
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [randomPassword, setRandomPassword] = useState("");

  // Function to generate OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  // Function to generate a random password
  const generateRandomPassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };

  // Handle email submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const otp = generateOtp();
    setGeneratedOtp(otp);
    setStep(2);
    alert(`OTP sent to ${email}: ${otp}`);
  };

  // Handle OTP verification
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      const password = generateRandomPassword();
      setRandomPassword(password);
      setStep(3);
      alert(`Your temporary password has been sent to ${email}: ${password}`);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white/60 backdrop-blur-lg z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Google Signup</h2>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:border-blue-500 outline-none"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded-md font-semibold hover:bg-blue-800">
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:border-blue-500 outline-none"
                required
              />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-500">
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <div className="text-center text-white bg-green-600 p-4 rounded-md font-semibold">
            Your temporary password: <b>{randomPassword}</b>
          </div>
        )}

        {/* ✅ FIXED: Clicking "Login" will close the modal and redirect to `/login` */}
        <div className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => {
              onClose(); // ✅ Close Google Signup Modal
              router.push("/"); // ✅ Redirect to login page
            }}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </div>
      </motion.div>
    </div>
  );
}
