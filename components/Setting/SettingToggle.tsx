"use client";

import { TOGGLE_TYPE } from "@/app/(Dashboard)/setting/GeneralSettingPage";
import React, { useState } from "react";
import { Switch } from "../ui/switch";

interface SettingToggleProps {
  label: string;
  description?: string; // Optional description
  initialState?: boolean;
  purpose: TOGGLE_TYPE;
}

const handleChangeDevicePushNotificationStatus = (newState: boolean) => {
  console.log("Device Push Notification status changed to ", newState);
};

const handleChangeEmailNotificationStatus = (newState: boolean) => {
  console.log("Email Notification status changed to ", newState);
};

export default function SettingToggle({
  label,
  description, // Accepting description as a prop
  initialState = false, // Default initialState to false
  purpose,
}: SettingToggleProps) {
  const [isToggled, setIsToggled] = useState(initialState);

  const handleToggle = () => {
    const newState = !isToggled;
    setIsToggled(newState); // Update the local toggle state

    switch (purpose) {
      case TOGGLE_TYPE.CHANGE_DEVICE_PUSH_NOTIFICATION_STATUS:
        handleChangeDevicePushNotificationStatus(newState); // Calling the function correctly
        break;
      case TOGGLE_TYPE.CHANGE_EMAIL_NOTIFICATION_STATUS:
        handleChangeEmailNotificationStatus(newState); // Calling the function correctly
        break;
      default:
        console.log("Unhandled toggle purpose");
        break;
    }
  };

  return (
    <div className=" flex flex-row justify-between px-6 py-4 transition-all ease-in-out duration-300">
      {/* Label and description */}
      <div>
        <label className="text-lg font-medium">{label}</label>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>

      {/* Switch */}
      <div className="mt-2">
        <Switch checked={isToggled} onCheckedChange={handleToggle} />
      </div>
    </div>
  );
}
