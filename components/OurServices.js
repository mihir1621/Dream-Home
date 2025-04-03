import { useState } from "react";

export default function OurServices() {
  const services = [
    { title: "Residential", img: "/images/HexaResidential.png" },
    { title: "Commercial", img: "/images/HexaCommerical.png" },
    { title: "PG/Hostel", img: "/images/HexaPG.png" },
    { title: "Plot/Land", img: "/images/HexaPlots.png" },
    { title: "Shared Flats", img: "/images/HexaSharedFlats.png" },
    { title: "Flatmates", img: "/images/HexaFlatmates.png" },
    { title: "Flatmates", img: "/images/HexaFlatmates.png" },
    { title: "Flatmates", img: "/images/HexaFlatmates.png" },
    { title: "Flatmates", img: "/images/HexaFlatmates.png" },
  ];

  return (
    <div className="grid grid-cols-3 gap-8 min-h-screen w-full p-4"> 
      {services.map((service, index) => (
        <div
          key={index}
          className={`relative flex-shrink-0 bg-gray-300 rounded-lg overflow-hidden shadow-md group transform transition-all duration-300 hover:scale-110
            ${
            index === 0 ? "col-span-1 row-span-2 h-66" : // Taller left block
            index === 1 ? "col-span-1 row-span-1 h-40" :
            index === 2 ? "col-span-1 row-span-1 h-40" :
            index === 3 ? "col-span-1 row-span-1 h-40" :
            index === 4 ? "col-span-1 row-span-2 h-66" : 
            index === 5 ? "col-span-1 row-span-1 h-40" :
            index === 6 ? "col-span-1 row-span-2 h-66" :
            index === 7 ? "col-span-1 row-span-1 h-40" :
            index === 8 ? "col-span-1 row-span-1 h-40" :  ""
            } w-auto`}
        >
          <img
            src={service.img}
            alt={service.title}
            className="w-full h-full object-cover transition-all duration-300 hover:opacity-20 rounded-lg"
          />
          {/* Overlay Title */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white font-semibold text-center text-lg">
              {service.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
