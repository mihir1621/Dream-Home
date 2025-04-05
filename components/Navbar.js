import { useState, useRef, useEffect } from "react";
import RotatingText from "../components/RotatingText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faHandshake, 
  faSignInAlt, 
  faList, 
  faBook, 
  faBriefcase, 
  faCalculator,
  faBookmark, 
  faComment, 
  faLock, 
  faPhoneAlt 
} from "@fortawesome/free-solid-svg-icons";

import AreaConverterModal from "@/components/AreaConverterModal";

export default function Navbar({ setIsLoginOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isAreaConverterOpen, setIsAreaConverterOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
    setIsOpen(false); // Close mobile menu when login is clicked
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsDesktopMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 right-0 w-full bg-white shadow-lg z-50">
        <div className="flex items-center justify-between p-4">
          {/* Brand Logo with Rotating Text */}
          <div className="relative pr-4 w-[150px] flex-shrink-0">
            <RotatingText
              texts={["Dream Home", "Your Home", "Ideal Home", "Eco Haven"]}
              mainClassName="text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors duration-300 whitespace-nowrap"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex gap-6 mx-auto">
            <button className="px-4 py-2 font-bold bg-blue-300 rounded-lg hover:text-gray-600 transition">
              Buyers
            </button>
            <button className="px-4 py-2 font-bold bg-blue-300 rounded-lg hover:text-gray-600 transition">
              Owners
            </button>
            <button className="px-4 py-2 font-bold bg-blue-300 rounded-lg hover:text-gray-600 transition">
              Coliving
            </button>
            <button className="px-4 py-2 font-bold bg-blue-300 rounded-lg hover:text-gray-600 transition">
              Tenants
            </button>
          </div>

          {/* Login Button and Desktop Dropdown (Right Side) */}
          <div className="hidden md:flex gap-2 items-center">
            <button
              className="px-4 py-2 font-bold bg-blue-300 rounded-lg hover:text-gray-600 transition"
              onClick={handleLoginClick}
            >
              Login
            </button>

            {/* ☰ Dropdown Button */}
            <div className="relative" ref={menuRef}>
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg"
                onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
              >
                ☰
              </button>

              {/* Desktop Dropdown Menu */}
              {isDesktopMenuOpen && (
                <div
                  className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-4 w-40 md:w-60 lg:w-80"
                  onMouseLeave={() => setIsDesktopMenuOpen(false)}
                >
                  <button className="block px-6 py-3 w-full text-left font-bold text-black hover:bg-gray-100">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Hi Guest👋🏼
                  </button>
                  <button className="block px-6 py-3 w-full text-left font-bold text-black hover:bg-gray-100">
                    <FontAwesomeIcon icon={faHandshake} className="mr-2" />
                    Seamless experience
                  </button>
                  <button className="block px-6 py-3 w-full text-left font-bold text-black hover:bg-gray-100">
                    <FontAwesomeIcon icon={faList} className="mr-2" />
                    My Listing
                  </button>
                  <button className="block px-6 py-3 w-full text-left font-bold text-black hover:bg-gray-100">
                    <FontAwesomeIcon icon={faList} className="mr-2" />
                    My Leads
                  </button>
                  <button className="block px-6 py-3 w-full text-left font-bold text-black hover:bg-gray-100">
                    <FontAwesomeIcon icon={faBook} className="mr-2" />
                    Blogs
                  </button>
                  <button className="block px-6 py-3 w-full text-left font-bold text-black hover:bg-gray-100">
                    <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                    Career
                  </button>
                  <button
                    className="block px-6 py-3 w-full text-left font-bold text-black hover:bg-gray-100"
                    onClick={() => setIsAreaConverterOpen(true)}
                  >
                    <FontAwesomeIcon icon={faCalculator} className="mr-2" />
                    Area Converter
                  </button>
                  <button className="block px-6 py-3 w-full text-left font-bold text-black hover:bg-gray-100">
                    <FontAwesomeIcon icon={faBookmark} className="mr-2" />
                    Bookmark
                  </button>
                  <button className="block px-6 py-3 w-full text-left font-bold text-black hover:bg-gray-100">
                    <FontAwesomeIcon icon={faComment} className="mr-2" />
                    Share Feedback
                  </button>
                  <button className="block px-6 py-3 w-full text-left font-bold text-black hover:bg-gray-100">
                    <FontAwesomeIcon icon={faLock} className="mr-2" />
                    Account Privacy
                  </button>
                  <button className="block px-6 py-3 w-full text-left font-bold text-black hover:bg-gray-100">
                    <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
                    Phone number privacy
                  </button>
                  <button
                    className="px-6 py-3 bg-white text-black w-full text-left font-bold hover:bg-gray-100"
                    onClick={handleLoginClick}
                  >
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button - Moved to the right by using ml-auto */}
          <button
            className="md:hidden bg-gray-200 rounded-lg p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md flex flex-col items-center gap-2 py-4">
            <button className="px-4 py-2 bg-white text-black rounded-lg font-bold text-left w-full">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Hi Guest👋🏼
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-lg font-bold text-left w-full">
              <FontAwesomeIcon icon={faHandshake} className="mr-2" />
              Seamless experience
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-lg font-bold text-left w-full">
              <FontAwesomeIcon icon={faList} className="mr-2" />
              My Listing
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-lg font-bold text-left w-full">
              <FontAwesomeIcon icon={faList} className="mr-2" />
              My Leads
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-lg font-bold text-left w-full">
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              Blogs
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-lg font-bold text-left w-full">
              <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
              Career
            </button>
            <button
              className="px-4 py-2 bg-white text-black rounded-lg font-bold text-left w-full"
              onClick={() => setIsAreaConverterOpen(true)}
            >
              <FontAwesomeIcon icon={faCalculator} className="mr-2" />
              Area Converter
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-lg font-bold text-left w-full">
              <FontAwesomeIcon icon={faBookmark} className="mr-2" />
              Bookmark
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-lg font-bold text-left w-full">
              <FontAwesomeIcon icon={faComment} className="mr-2" />
              Share Feedback
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-lg font-bold text-left w-full">
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Account Privacy
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-lg font-bold text-left w-full">
              <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
              Phone number privacy
            </button>
            <button
              className="px-4 py-2 bg-white text-black rounded-lg font-bold text-left w-full"
              onClick={handleLoginClick}
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Login
            </button>
          </div>
        )}
      </nav>
      {isAreaConverterOpen && (
        <AreaConverterModal
          isOpen={isAreaConverterOpen}
          onClose={() => setIsAreaConverterOpen(false)}
        />
      )}
    </>
  );
}