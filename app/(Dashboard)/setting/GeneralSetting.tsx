import SettingToggle from "@/components/Setting/SettingToggle";
import { TOGGLE_TYPE } from "@/lib/setting/enum";
import { SettingToggleProps } from "@/lib/setting/type";
import { fetchWithTryCatch } from "@/lib/utils";
import {
  getDevicePushNotificationStatus,
  getEmailNotificationStatus,
  getNewsStatus,
} from "@/services/setting-service";

export default async function GeneralSetting() {
  const initialDevicePushNotificationStatus = await fetchWithTryCatch(
    getDevicePushNotificationStatus
  );
  const initialEmailNotificationStatus = await fetchWithTryCatch(
    getEmailNotificationStatus
  );
  const initialNewsStatus = await fetchWithTryCatch(getNewsStatus);

  const devicePushNotification: SettingToggleProps = {
    label: "Allow Device Push Notification",
    description: "Enable this to receive push notifications on your device.",
    initialState: initialDevicePushNotificationStatus,
    purpose: TOGGLE_TYPE.CHANGE_DEVICE_PUSH_NOTIFICATION_STATUS,
  };

  const emailNotification: SettingToggleProps = {
    label: "Allow Email Notification",
    description: "Enable this to receive emails.",
    initialState: initialEmailNotificationStatus,
    purpose: TOGGLE_TYPE.CHANGE_EMAIL_NOTIFICATION_STATUS,
  };

  const news: SettingToggleProps = {
    label: "Allow to receive News and Updates",
    description: "Enable this to receive news and updates via Email.",
    initialState: initialNewsStatus,
    purpose: TOGGLE_TYPE.CHANGE_NEWS_STATUS,
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">General Setting</h2>
      <div className="gap-2 flex py-2 flex-col bg-secondary text-secondary-foreground  rounded-lg shadow-md">
        <SettingToggle {...devicePushNotification} />
        <div className="border-secondary-foreground/20 border-b"></div>
        <SettingToggle {...emailNotification} />
        <div className="border-secondary-foreground/20 border-b"></div>
        <SettingToggle {...news} />
      </div>
    </div>
  );
}
