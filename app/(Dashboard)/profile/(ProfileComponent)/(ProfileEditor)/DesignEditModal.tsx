import { Button } from "@/components/ui/button";
import { useProfileContext } from "@/context/profileContext";
import { hexToRgba, rgbaToHsva } from "@/lib/color_utils";
import {
  svgWaveLayoutData,
  svgWaveLayouts,
} from "@/lib/profileCardLayoutData/SvgWaveLayoutData";
import { useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { GrFormCheckmark } from "react-icons/gr";
const colorPresets = [
  { name: "Red", color: "#FF6347" },
  { name: "Green", color: "#32CD32" },
  { name: "Blue", color: "#1E90FF" },
  { name: "Yellow", color: "#FFD700" },
  { name: "Purple", color: "#800080" },
  { name: "Orange", color: "#FFA500" },
  { name: "Gray", color: "#808080" },
  { name: "Gold", color: "#FFD900" },
  { name: "Turquoise", color: "#40E0D0" },
  { name: "Pink", color: "#FFC0CB" },
  { name: "Teal", color: "#008080" },
  { name: "Lavender", color: "#E6E6FA" },
].map((preset) => {
  const rgba = hexToRgba(preset.color);
  const hsva = rgbaToHsva(rgba);
  return { ...preset, rgba, hsva };
});

/** Reusable Image Upload Component */
function ImageUpload({
  label,
  keyName,
  defaultImage,
}: {
  label: string;
  keyName: "image" | "logo_icon";
  defaultImage: string;
}) {
  const context = useProfileContext();
  if (!context) {
    console.warn("profileEditContext is null");
    return null;
  }

  const { profileData, setProfileData } = context;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file); // Generate preview URL
      const updatedData = { ...profileData, [keyName]: fileUrl };
      setProfileData(updatedData);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-thin">{label}</h3>
      <div className="mt-4">
        <label
          htmlFor={`upload-${keyName}`}
          className="relative flex flex-col items-center justify-center w-32 h-32 rounded-full cursor-pointer transition-all"
        >
          <img
            src={profileData[keyName] || defaultImage}
            alt={label}
            className="w-32 h-32 object-cover rounded-full shadow-md border-2 border-gray-300 hover:opacity-80"
          />
          <input
            id={`upload-${keyName}`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
}

export default function DesignEditModal() {
  const context = useProfileContext();
  if (!context) {
    console.warn("profileEditContext is null");
    return null;
  }

  const { profileData, setProfileData } = context;
  const prev_color = "#ffffff";
  const prev_wave = profileData.wave_type;
  const [selectedColor, setSelectedColor] = useColor(prev_color);
  const [selectedWaveLayout, setSelectedWaveLayout] =
    useState<string>(prev_wave);

  const handleColorSelect = (color: string) => {
    const rgba = hexToRgba(color);
    const hsva = rgbaToHsva(rgba);
    setSelectedColor({
      hex: color,
      rgb: rgba,
      hsv: hsva,
    });
  };

  const handleWaveLayoutSelect = (layout: string) => {
    const updateProfileData = { ...profileData, ["wave_type"]: layout };
    setProfileData(updateProfileData);
    setSelectedWaveLayout(layout);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Title */}
      <h2 className="text-2xl font-thin">Design</h2>

      {/* Profile Photo */}
      <ImageUpload
        label="Profile Photo"
        keyName="image"
        defaultImage="/placeholder/profile.png"
      />

      {/* Logo */}
      <ImageUpload
        label="Logo"
        keyName="logo_icon"
        defaultImage="/placeholder/logo.png"
      />

      {/* WaveLayouts */}
      <div>
        <h3 className="text-lg font-thin">Select a WaveLayout</h3>
        <div className="flex flex-wrap gap-4 mt-4">
          {svgWaveLayouts.map((layout) => (
            <div
              key={layout}
              onClick={() => handleWaveLayoutSelect(layout)}
              className={`relative w-16 h-16 bg-secondary rounded overflow-hidden shadow-sm cursor-pointer transition-transform hover:scale-105 ${
                selectedWaveLayout === layout ? "border-4 border-white" : ""
              }`}
            >
              <div className="absolute w-full bottom-0">
                {svgWaveLayoutData[layout]}
              </div>
              {selectedWaveLayout === layout && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                  <GrFormCheckmark />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Color Preset Selection */}
      <div>
        <h3 className="text-lg font-thin">Select a Color Preset</h3>
        <div className="flex flex-box flex-wrap gap-4 mt-4 max-w-[200px]">
          {colorPresets.map((preset) => (
            <Button
              key={preset.name}
              onClick={() => handleColorSelect(preset.color)}
              className={`relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-9 lg:h-9 rounded transition-transform hover:scale-110 ${
                selectedColor.hex === preset.color
                  ? "border-4 border-secondary"
                  : "border-2 border-transparent"
              }`}
              style={{ backgroundColor: preset.color }}
            >
              {selectedColor.hex === preset.color && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                  <GrFormCheckmark />
                </span>
              )}
            </Button>
          ))}

          {/* Custom Color */}
          <div>
            <h2 className="text-lg font-thin mb-3">Last Used Color</h2>
            <Button
              onClick={() => handleColorSelect(prev_color)}
              className={`relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-9 lg:h-9 rounded transition-transform hover:scale-110 ${
                selectedColor.hex === prev_color
                  ? "border-4 border-secondary"
                  : "border-2 border-transparent"
              }`}
              style={{ backgroundColor: prev_color }}
            >
              {selectedColor.hex === prev_color && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                  <GrFormCheckmark />
                </span>
              )}
            </Button>
          </div>

          <div className="shadow-xl overflow-hidden rounded-lg">
            <ColorPicker color={selectedColor} onChange={setSelectedColor} />
          </div>
        </div>
      </div>
    </div>
  );
}
