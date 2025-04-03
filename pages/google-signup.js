import { useState } from "react";

export default function GoogleSignup() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  // Function to generate 6-digit OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  // Function to generate an 8-character random password
  const generateRandomPassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  // Handle email submission and send OTP
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const otp = generateOtp();
    setGeneratedOtp(otp);
    setStep(2);
    alert(`OTP sent to ${email}: ${otp}`); // Simulate sending OTP
  };

  // Handle OTP verification
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      const password = generateRandomPassword();
      setGeneratedPassword(password);
      setStep(3);
      alert(`Your password has been sent to ${email}: ${password}`); // Simulate email sending
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  // Handle password verification for login
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (enteredPassword === generatedPassword) {
      alert("Login successful!");
    } else {
      alert("Wrong password! Please check your email.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-gray-600">Google Signup</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-gray-600">Enter OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md">
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-gray-600">Enter Password</h2>
            <input
              type="password"
              placeholder="Enter received password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
            <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md">
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
