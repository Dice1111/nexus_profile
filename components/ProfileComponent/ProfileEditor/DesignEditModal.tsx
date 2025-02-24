"use client";

import { Button } from "@/components/ui/button";
import { useProfileContext } from "@/context/profileContext";
import { colorPresets, hexToRgba, rgbaToHsva } from "@/lib/color_utils";
import {
  ColorableElement,
  colorableElements,
  ProfileLayout,
  profileLayouts,
} from "@/lib/profileCardLayoutData/LayoutData";
import {
  svgWaveLayoutData,
  svgWaveLayouts,
} from "@/lib/profileCardLayoutData/SvgWaveLayoutData";
import _throttle from "lodash/throttle";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { GrFormCheckmark } from "react-icons/gr";
import Image from "next/image";
import { ProfileCard } from "@/types/types";

/** Reusable Image Upload Component */
function ImageUpload({
  label,
  keyName,
}: {
  label: string;
  keyName: "image" | "logo_icon";
}) {
  const context = useProfileContext();

  const default_profile = "/image/default-profile.jpg";

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
      <h1 className="text-xl font-thin">{label}</h1>
      <div className="mt-4">
        <label
          htmlFor={`upload-${keyName}`}
          className="relative flex flex-col items-center justify-center w-32 h-32 rounded-full cursor-pointer transition-all"
        >
          <Image
            src={profileData[keyName] || default_profile}
            alt={label}
            width={1000}
            height={1000}
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

  const { profileData, setProfileData } = context;

  const prev_wave = profileData.wave_type;

  //selection state

  const [selectedColor, setSelectedColor] = useColor("ffffff");

  const [selectedWaveLayout, setSelectedWaveLayout] =
    useState<string>(prev_wave);
  const [selectedProfileLayout, setSelectedProfileLayout] = useState<string>(
    profileData.layout
  );
  const [selectedElement, setSelectedElement] = useState<ColorableElement>(
    ColorableElement.BACKGROUND
  );

  //Selection handler
  const handleWaveLayoutSelect = (layout: string) => {
    const updateProfileData = { ...profileData, ["wave_type"]: layout };
    setProfileData(updateProfileData);
    setSelectedWaveLayout(layout);
  };

  const handleProfileLayoutSelect = (layout: ProfileLayout) => {
    const updateProfileData = { ...profileData, ["layout"]: layout };
    setProfileData(updateProfileData);
    setSelectedProfileLayout(layout);
  };

  const handleElementSelect = (element: ColorableElement) => {
    setSelectedElement(element);
  };

  const updateElementColor = useCallback(
    (color: string, selectedElement: ColorableElement) => {
      setProfileData((prevProfileData: ProfileCard) => {
        const newUpdateProfile = { ...prevProfileData };

        // Update only if the color has changed for the selected element
        if (
          selectedElement === ColorableElement.BACKGROUND &&
          newUpdateProfile.background_color !== color
        ) {
          newUpdateProfile.background_color = color;
        } else if (
          selectedElement === ColorableElement.FOREGROUND &&
          newUpdateProfile.foreground_color !== color
        ) {
          newUpdateProfile.foreground_color = color;
        } else if (
          selectedElement === ColorableElement.WAVE &&
          newUpdateProfile.wave_color !== color
        ) {
          newUpdateProfile.wave_color = color;
        } else {
          // If no changes, return the same object to avoid unnecessary updates
          return prevProfileData;
        }

        return newUpdateProfile;
      });
    },
    [setProfileData]
  );

  const handleColorSelect = useCallback(
    (color: string) => {
      if (selectedColor.hex !== color) {
        const rgba = hexToRgba(color);
        const hsva = rgbaToHsva(rgba);
        setSelectedColor({
          hex: color,
          rgb: rgba,
          hsv: hsva,
        });

        updateElementColor(color, selectedElement);
      }
    },
    [selectedColor.hex, selectedElement, updateElementColor, setSelectedColor]
  );

  useEffect(() => {
    console.log(selectedElement);
    if (selectedElement === ColorableElement.BACKGROUND) {
      handleColorSelect(profileData.background_color);
    } else if (selectedElement === ColorableElement.FOREGROUND) {
      handleColorSelect(profileData.foreground_color);
    } else if (selectedElement === ColorableElement.WAVE) {
      handleColorSelect(profileData.wave_color);
    }
  }, [selectedElement, profileData, handleColorSelect]);

  const throttledUpdate = useMemo(
    () =>
      _throttle((newColor, selectedElement) => {
        setSelectedColor(newColor);
        updateElementColor(newColor.hex, selectedElement);
      }, 20),
    [updateElementColor, setSelectedColor]
  );

  return (
    <div className="flex flex-col gap-10">
      {/* Title */}
      <h1 className="text-2xl font-thin">Design</h1>

      {/* Profile Photo */}
      <ImageUpload label="Profile Photo" keyName="image" />

      {/* Logo */}
      <ImageUpload label="Logo" keyName="logo_icon" />

      {/* Profile Layout */}
      <div>
        <h1 className="text-lg font-thin">Profile Layout</h1>

        <div className="flex flex-box gap-4 mt-4">
          {profileLayouts.map((layout) => (
            <Button
              key={layout}
              onClick={() => handleProfileLayoutSelect(layout)}
              className={`relative  rounded transition-transform hover:scale-105 ${
                selectedProfileLayout === layout ? "border-2 border-white" : ""
              }`}
            >
              {layout}
            </Button>
          ))}
        </div>
      </div>

      {/* WaveLayouts */}
      <div>
        <h1 className="text-lg font-thin">Select a WaveLayout</h1>
        <div className="flex flex-wrap gap-4 mt-4">
          {svgWaveLayouts.map((wave) => (
            <div
              key={wave}
              onClick={() => handleWaveLayoutSelect(wave)}
              className={`relative w-16 h-16 bg-secondary rounded overflow-hidden shadow-sm cursor-pointer transition-transform hover:scale-105 ${
                selectedWaveLayout === wave ? "border-4 border-white" : ""
              }`}
            >
              <div className="absolute w-full bottom-0">
                {
                  svgWaveLayoutData(profileData.wave_color)[
                    wave as keyof typeof svgWaveLayoutData
                  ]
                }
              </div>
              {selectedWaveLayout === wave && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                  <GrFormCheckmark />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Colorable Element Selection */}
      <div>
        <h1 className="text-lg font-thin">Change Color</h1>

        <div className="flex flex-box gap-4 mt-4">
          {colorableElements.map((element) => (
            <Button
              key={element}
              onClick={() => handleElementSelect(element)}
              className={`relative  rounded transition-transform hover:scale-105 ${
                selectedElement === element ? "border-2 border-white" : ""
              }`}
            >
              {element}
            </Button>
          ))}
        </div>
      </div>

      {/* Color Preset Selection */}
      <div>
        <h1 className="text-lg font-thin">Select a Color Preset</h1>
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

          <div className="shadow-xl overflow-hidden rounded-lg">
            <ColorPicker
              color={selectedColor}
              onChange={(newColor) => {
                console.log(selectedElement);
                throttledUpdate(newColor, selectedElement); // Throttled update
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
