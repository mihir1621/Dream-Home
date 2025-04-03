import { useState } from "react";
import GoogleSignupForm from "../components/GoogleSignupForm"; // ✅ Import the component
import SignupForm from "../components/SignupForm"; // ✅ Ensure this is also correctly imported

export default function SignupPage() {
  const [showGoogleSignup, setShowGoogleSignup] = useState(false);

  return (
    <div>
      {showGoogleSignup ? (
        <GoogleSignupForm onClose={() => setShowGoogleSignup(false)} /> // ✅ Correct JSX structure
      ) : (
        <SignupForm onGoogleSignup={() => setShowGoogleSignup(true)} /> // ✅ Correct JSX structure
      )}
    </div>
  );
}
