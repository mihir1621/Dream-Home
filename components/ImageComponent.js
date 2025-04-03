// components/ImageComponent.js
export default function ImageComponent({ imagePath, heading }) {
    return (
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <img
          src={imagePath}
          alt="Signup"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-blue-900 opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center p-6 text-white">
          <h2 className="text-2xl font-bold leading-tight">{heading}</h2>
        </div>
      </div>
    );
  }
  