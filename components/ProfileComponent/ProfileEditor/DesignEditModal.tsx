"use client";

import { Button } from "@/components/ui/button";
import { useProfileContext } from "@/context/profileContext";
import { colorPresets, hexToRgba, rgbaToHsva } from "@/lib/color_utils";
import {
  ColorableElement,
  colorableElements,
} from "@/lib/profileCardLayoutData/LayoutData";
// import {
//   svgWaveLayoutData,
//   svgWaveLayouts,
// } from "@/lib/profileCardLayoutData/SvgWaveLayoutData";
import { PROFILE_LAYOUT } from "@/core/_domain/enum/design-repository.enum";
import { FetchDesignData } from "@/core/_domain/types/design-repository.types";
import { useDesignState } from "@/state_management/design.state";
import _throttle from "lodash/throttle";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { GrFormCheckmark } from "react-icons/gr";
import { PROFILE_LAYOUTS } from "../ProfileHeaderLayout/ProfileHeaderLayout";

/** Reusable Image Upload Component */

export default function DesignEditModal() {
  const foregroundColor = useDesignState((state) => state.foregroundColor);
  const backgroundColor = useDesignState((state) => state.backgroundColor);
  const profileImage = useDesignState((state) => state.profileImage);
  const logoImage = useDesignState((state) => state.logoImage);
  const layout = useDesignState((state) => state.layout);

  const setForegroundColor = useDesignState(
    (state) => state.setForegroundColor
  );
  const setBackgroundColor = useDesignState(
    (state) => state.setBackgroundColor
  );
  const setProfileImage = useDesignState((state) => state.setProfileImage);
  const setLogoImage = useDesignState((state) => state.setLogoImage);
  const setLayout = useDesignState((state) => state.setLayout);

  //selection state

  const [selectedColor, setSelectedColor] = useColor("ffffff");

  // const [selectedWaveLayout, setSelectedWaveLayout] =
  //   useState<string>(prev_wave);

  const [selectedElement, setSelectedElement] = useState<ColorableElement>(
    ColorableElement.BACKGROUND
  );

  //Selection handler
  // const handleWaveLayoutSelect = (layout: string) => {
  //   const updateProfileData = { ...profileData, ["wave_type"]: layout };
  //   setProfileData(updateProfileData);
  //   setSelectedWaveLayout(layout);
  // };

  const handleElementSelect = (element: ColorableElement) => {
    setSelectedElement(element);
  };

  const ImageUpload = ({
    label,
    keyName,
  }: {
    label: string;
    keyName: "profileImage" | "logoImage";
  }) => {
    const default_profile = "/image/default-profile.jpg";

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file); // Generate preview URL

        if (keyName === "profileImage") {
          setProfileImage(fileUrl);
        } else if (keyName === "logoImage") {
          setLogoImage(fileUrl);
        }
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
              src={
                keyName === "profileImage"
                  ? profileImage || default_profile
                  : logoImage || default_profile
              }
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
  };

  const updateElementColor = useCallback(
    (color: string, selectedElement: ColorableElement) => {
      if (selectedElement === ColorableElement.BACKGROUND) {
        setBackgroundColor(color);
      } else if (selectedElement === ColorableElement.FOREGROUND) {
        setForegroundColor(color);
      }
    },
    [setBackgroundColor, setForegroundColor]
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
    if (selectedElement === ColorableElement.BACKGROUND) {
      handleColorSelect(backgroundColor);
    } else if (selectedElement === ColorableElement.FOREGROUND) {
      handleColorSelect(foregroundColor);
    }
    // else if (selectedElement === ColorableElement.WAVE) {
    //   handleColorSelect(design.wave_color);
    // }
  }, [selectedElement, backgroundColor, foregroundColor, handleColorSelect]);

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
      <ImageUpload label="Profile Photo" keyName="profileImage" />

      {/* Logo */}
      <ImageUpload label="Logo" keyName="logoImage" />

      {/* Profile Layout */}
      <div>
        <h1 className="text-lg font-thin">Profile Layout</h1>

        <div className="flex flex-box gap-4 mt-4">
          {PROFILE_LAYOUTS.map((layoutButton) => (
            <Button
              key={layoutButton}
              onClick={() => setLayout(layoutButton)}
              className={`relative  rounded transition-transform hover:scale-105 ${
                layout === layoutButton ? "border-2 border-white" : ""
              }`}
            >
              {layoutButton}
            </Button>
          ))}
        </div>
      </div>

      {/* WaveLayouts */}
      {/* <div>
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
      </div> */}

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
                throttledUpdate(newColor, selectedElement); // Throttled update
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
