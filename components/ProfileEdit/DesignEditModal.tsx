import React, { useState } from "react";

// Define color presets
const colorPresets = [
  { name: "Red", color: "#FF6347" },
  { name: "Green", color: "#32CD32" },
  { name: "Blue", color: "#1E90FF" },
  { name: "Yellow", color: "#FFD700" },
  { name: "Purple", color: "#800080" },
  { name: "Orange", color: "#FFA500" },
  { name: "Gray", color: "#808080" },
  { name: "Gold", color: "#FFD700" },
  { name: "Turquoise", color: "#40E0D0" },
  { name: "Pink", color: "#FFC0CB" },
];

export default function DesignEditModal() {
  //const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Handle color selection
  const handleColorSelect = (color: string) => {
    //setSelectedColor(color); // Set the selected color to the state
    console.log("Selected color:", color);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800">Design Settings</h2>

      {/* Color Preset Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-700">
          Select a Color Preset
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-4">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handleColorSelect(preset.color)}
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full transition-transform hover:scale-110 border-2 ${
                preset.color === preset.color
                  ? "border-gray-800"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: preset.color }}
            />
          ))}
        </div>
      </div>

      {/* Design Preview */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-700">Design Preview</h3>
        <div
          className="w-full sm:w-48 md:w-60 lg:w-80 h-48 mt-4 rounded-lg"
          style={{
            backgroundColor: "#f0f0f0", // Preview color changes based on selection
            border: "2px solid #ccc",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        ></div>
      </div>
    </div>
  );
}
