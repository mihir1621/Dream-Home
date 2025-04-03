import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function RotatingText({ texts, rotationInterval = 2000, mainClassName }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  return (
    <motion.div
      key={texts[index]}
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-120%", opacity: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 400 }}
      className={mainClassName}
    >
      {texts[index]}
    </motion.div>
  );
}
