"use client";
import React, { useState } from "react";
import { Switch } from "../ui/switch";
import { TOGGLE_TYPE } from "@/lib/setting/enum";
import { SettingToggleProps } from "@/lib/setting/type";

const handleChangeDevicePushNotificationStatus = (newState: boolean) => {
  console.log("Device Push Notification status changed to ", newState);
};

const handleChangeEmailNotificationStatus = (newState: boolean) => {
  console.log("Email Notification status changed to ", newState);
};

const handleChangeReceieveNewsStatus = (newState: boolean) => {
  console.log("Receive news status changed to ", newState);
};

export default function SettingToggle({
  label,
  description,
  initialState = false,
  purpose,
}: SettingToggleProps) {
  const [isToggled, setIsToggled] = useState(initialState);

  const handleToggle = () => {
    const newState = !isToggled;
    setIsToggled(newState);

    switch (purpose) {
      case TOGGLE_TYPE.CHANGE_DEVICE_PUSH_NOTIFICATION_STATUS:
        handleChangeDevicePushNotificationStatus(newState);
        break;
      case TOGGLE_TYPE.CHANGE_EMAIL_NOTIFICATION_STATUS:
        handleChangeEmailNotificationStatus(newState);
        break;
      case TOGGLE_TYPE.CHANGE_NEWS_STATUS:
        handleChangeReceieveNewsStatus(newState);
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
