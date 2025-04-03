import { useState, useEffect } from "react";

const TrueFocus = ({ 
  sentence, 
  blurAmount = 5, 
  animationDuration = 2, 
  pauseBetweenAnimations = 1, 
  resetPhaseDuration = 3,  // 🔹 Time when all words appear together
  loopsBeforeReset = 3      // 🔹 After how many loops should all words appear?
}) => {
  const words = sentence.split(" "); // ["Find", "Your", "Dream", "Home"]
  const [focusIndex, setFocusIndex] = useState(0);
  const [loopCount, setLoopCount] = useState(0);
  const [isResetPhase, setIsResetPhase] = useState(false);

  useEffect(() => {
    if (isResetPhase) {
      // 🔹 Show all words together for resetPhaseDuration (3 sec)
      const resetTimeout = setTimeout(() => {
        setIsResetPhase(false);
        setFocusIndex(0); // Restart normal animation
      }, resetPhaseDuration * 1000);
      return () => clearTimeout(resetTimeout);
    }

    // 🔹 Normal animation: highlight words one by one
    const interval = setInterval(() => {
      setFocusIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1;
        } else {
          // 🔹 If loop finishes, increment count
          setLoopCount((count) => count + 1);

          // 🔹 If we reached `loopsBeforeReset`, trigger reset phase
          if ((loopCount + 1) % loopsBeforeReset === 0) {
            setIsResetPhase(true);
          }
          return 0; // Restart animation
        }
      });
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [animationDuration, pauseBetweenAnimations, words.length, loopCount, isResetPhase]);

  return (
    <div className="flex flex-wrap justify-center space-x-2 sm:space-x-3 text-white font-bold text-2xl sm:text-4xl md:text-5xl">
      {isResetPhase ? (
        // 🔹 During reset phase, show all words WITH SPACE
        <span className="relative transition-all ease-in-out duration-1000"
          style={{
            filter: "none",
            opacity: 1,
            transform: "scale(1.2)",
            transition: `transform ${animationDuration}s ease-in-out`,
            whiteSpace: "pre-wrap" // 👈 Ensure spaces are respected
          }}
        >
          {sentence} {/* ✅ Adds space when words appear together */}
        </span>
      ) : (
        // 🔹 Normal word-by-word animation
        words.map((word, index) => (
          <span
            key={index}
            className="relative transition-all ease-in-out duration-1000"
            style={{
              filter: focusIndex === index ? "none" : `blur(${blurAmount}px)`,
              opacity: focusIndex === index ? 1 : 0.5,
              transform: focusIndex === index ? "scale(1.2)" : "scale(1)",
              transition: `transform ${animationDuration}s ease-in-out`,
            }}
          >
            {word}

            {/* ✅ Corner Borders only when one word is focused */}
            {focusIndex === index && !isResetPhase && (
              <span className="absolute inset-0 flex justify-center items-center">
                <span className="absolute top-[-5px] left-[-5px] w-3 h-3 border-t-2 border-l-2 border-gray-400"></span>
                <span className="absolute top-[-5px] right-[-5px] w-3 h-3 border-t-2 border-r-2 border-gray-400"></span>
                <span className="absolute bottom-[-5px] left-[-5px] w-3 h-3 border-b-2 border-l-2 border-gray-400"></span>
                <span className="absolute bottom-[-5px] right-[-5px] w-3 h-3 border-b-2 border-r-2 border-gray-400"></span>
              </span>
            )}
          </span>
        ))
      )}
    </div>
  );
};

export default TrueFocus;
