import { hexToRgba, rgbaToHsva } from "@/lib/color_utils";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { GoPlus } from "react-icons/go";
import { GrFormCheckmark } from "react-icons/gr";

// Define color presets with calculated RGBA and HSVA values
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

export default function DesignEditModal() {
  const prev_color = "#ffffff";
  const [selectedColor, setSelectedColor] = useColor(prev_color);

  //fetch this from data base.

  // Handle color selection;
  const handleColorSelect = (color: string) => {
    const rgba = hexToRgba(color);
    const hsva = rgbaToHsva(rgba);
    setSelectedColor({
      hex: color,
      rgb: rgba,
      hsv: hsva,
    }); // Update with hex color
    console.log("Selected color:", color);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Title */}
      <h2 className=" text-2xl font-thin">Design</h2>

      {/* Color Preset Selection */}
      <div>
        <h3 className="text-lg font-thin">Select a Color Preset</h3>
        <div className="flex flex-box flex-wrap gap-4 mt-4 max-w-[200px]">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handleColorSelect(preset.color)}
              className={`relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-9 lg:h-9 rounded transition-transform hover:scale-110 ${
                selectedColor.hex === preset.color
                  ? "border-4 border-secondary"
                  : "border-2 border-transparent"
              }`}
              style={{ backgroundColor: preset.color }}
            >
              {/* Mark */}
              {selectedColor.hex === preset.color && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                  <GrFormCheckmark />
                </span>
              )}
            </button>
          ))}

          {/* Custom Color */}
          <div>
            <h2 className="text-lg font-thin mb-3">Last Used Color</h2>
            <button
              onClick={() => handleColorSelect(prev_color)}
              className={`relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-9 lg:h-9 rounded transition-transform hover:scale-110 ${
                selectedColor.hex === prev_color
                  ? "border-4 border-secondary"
                  : "border-2 border-transparent"
              }`}
              style={{ backgroundColor: prev_color }}
            >
              {/* Mark */}
              {selectedColor.hex === prev_color && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                  <GrFormCheckmark />
                </span>
              )}
            </button>
          </div>

          <div className=" shadow-xl overflow-hidden rounded-lg">
            <ColorPicker color={selectedColor} onChange={setSelectedColor} />
          </div>
        </div>
        {/* Color Picker */}
      </div>

      {/* Profile Pic */}
      <div>
        <h2 className="text-2xl font-thin">Profile Photo</h2>
        <div className="mt-4">
          <label
            htmlFor="upload-photo"
            className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition-all"
          >
            <GoPlus size={30} className="mx-auto transition mt-4" />
            <span className="mt-2 text-sm text-gray-500">Upload Photo</span>
            <input
              id="upload-photo"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Logo */}
      <div>
        <h2 className="text-2xl font-thin">Logo</h2>
        <div className="mt-4">
          <label
            htmlFor="upload-logo"
            className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition-all"
          >
            <GoPlus size={30} className="mx-auto transition mt-4" />
            <span className="mt-2 text-sm text-gray-500">Upload Logo</span>
            <input
              id="upload-logo"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
