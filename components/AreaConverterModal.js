import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const areaUnits = {
  "Square Feet": 1,
  "Square Meter": 0.092903,
  "Acre": 0.0000229568,
  "Hectare": 0.0000092903,
  "Square Yard": 0.111111,
  "Square Inch": 144,
  "Square Kilometer": 0.000000092903,
  "Square Mile": 0.00000003587,
};

const regionalUnits = {
  "Bigha": 27225,      // Approximate conversion factor (sq ft)
  "Guntha": 1089,       // Approximate conversion factor (sq ft)
  "Gaj": 9,             // 1 square yard = 9 sq ft
  "Ground": 2400,       // Approximate conversion factor (sq ft)
  "Cent": 435.6,        // 1 cent = 435.6 sq ft (1/100 acre)
  "Decimal": 435.6,     // 1 decimal = 435.6 sq ft
};

const indianStates = {
  "Andhra Pradesh": { /* state-specific data */ },
  "Arunachal Pradesh": { /* state-specific data */ },
  "Assam": { /* state-specific data */ },
  "Bihar": { /* state-specific data */ },
  "Chhattisgarh": { /* state-specific data */ },
  "Goa": { /* state-specific data */ },
  "Gujarat": { /* state-specific data */ },
  "Haryana": { /* state-specific data */ },
  "Himachal Pradesh": { /* state-specific data */ },
  "Jharkhand": { /* state-specific data */ },
  "Karnataka": { /* state-specific data */ },
  "Kerala": { /* state-specific data */ },
  "Madhya Pradesh": { /* state-specific data */ },
  "Maharashtra": { /* state-specific data */ },
  "Manipur": { /* state-specific data */ },
  "Meghalaya": { /* state-specific data */ },
  "Mizoram": { /* state-specific data */ },
  "Nagaland": { /* state-specific data */ },
  "Odisha": { /* state-specific data */ },
  "Punjab": { /* state-specific data */ },
  "Rajasthan": { /* state-specific data */ },
  "Sikkim": { /* state-specific data */ },
  "Tamil Nadu": { /* state-specific data */ },
  "Telangana": { /* state-specific data */ },
  "Tripura": { /* state-specific data */ },
  "Uttar Pradesh": { /* state-specific data */ },
  "Uttarakhand": { /* state-specific data */ },
  "West Bengal": { /* state-specific data */ },
};

export default function AreaConverterModal({ isOpen, onClose }) {
  const router = useRouter();
  const [regionalMode, setRegionalMode] = useState(false);
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [selectedState, setSelectedState] = useState(""); // State for selected Indian state

  useEffect(() => {
    if (regionalMode) {
      setFromUnit("Bigha");
      setToUnit("Guntha");
    } else {
      setFromUnit("Square Feet");
      setToUnit("Square Meter");
    }
  }, [regionalMode]);

  const units = regionalMode ? regionalUnits : areaUnits;

  const convertArea = (value, from, to) => {
    const num = parseFloat(value);
    if (!num || isNaN(num) || !from || !to) return "";
    const valueInSqFt = num / units[from];
    return (valueInSqFt * units[to]).toFixed(6);
  };

  const handleConversion = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setResult(convertArea(value, fromUnit, toUnit));
  };

  useEffect(() => {
    if (inputValue !== "") {
      setResult(convertArea(inputValue, fromUnit, toUnit));
    }
  }, [fromUnit, toUnit]);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-blue-300 bg-opacity-50 backdrop-blur-sm z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
          <button
            onClick={() => {
              onClose();
              router.push("/");
            }}
            className="absolute top-4 right-4 text-black text-xl hover:text-gray-400"
          >
            ✖
          </button>
          <h2 className="text-xl font-bold mb-4 text-black text-center hover:text-gray-900">Area Converter</h2>

          {/* Toggle Button for Regional Mode */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setRegionalMode(!regionalMode)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {regionalMode ? "Standard Mode" : "Regional Mode"}
            </button>
          </div>

          {/* Regional Form with State Dropdown */}
          {regionalMode && (
            <div className="mb-4">
              <label htmlFor="state-select" className="block text-gray-700 font-bold mb-2 ">
                State:
              </label>
              <select
                id="state-select"
                className="w-full px-4 py-2 bg-white border border-black text-black rounded focus:outline-none focus:border-black"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="" disabled>Please select state</option>
                {Object.keys(indianStates).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-400 font-semibold">From:</label>
              <select
                className="w-full p-2 border rounded text-black"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
              >
                <option value="">Select</option>
                {Object.keys(units).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 font-semibold">To:</label>
              <select
                className="w-full p-2 border rounded text-black"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
              >
                <option value="">Select</option>
                {Object.keys(units).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 font-semibold">Enter Value:</label>
              <input
                type="number"
                className="w-full p-2 border rounded text-black"
                value={inputValue}
                onChange={handleConversion}
              />
            </div>

            <div className="text-lg font-bold bg-green-500 p-3 rounded text-center text-black">
              {result
                ? `${inputValue} ${fromUnit} = ${result} ${toUnit}`
                : "Enter a value"}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
