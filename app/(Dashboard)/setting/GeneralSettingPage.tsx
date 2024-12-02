import SettingToggle from "@/components/Setting/SettingToggle";

export enum TOGGLE_TYPE {
  CHANGE_DEVICE_PUSH_NOTIFICATION_STATUS,
  CHANGE_EMAIL_NOTIFICATION_STATUS,
  CHANGE_NEWS_STATUS,
}

const getDevicePushNotificationStatus = async () => {
  return false; // Simulate fetching initial state
};

const getEmailNotificationStatus = async () => {
  return false; // Simulate fetching initial state
};

const getNewsStatus = async () => {
  return false; // Simulate fetching initial state
};

const DevicePushNotificationLabel = "Allow Device Push Notification";
const DevicePushNotificationDescription =
  "Enable this to receive push notifications on your device.";
const EmailNotificationLabel = "Allow Email Notification";
const EmailNotificationDescription = "Enable this to receive emails.";
const NewsLabel = "Allow to receive News and Updates";
const NewsDescription = "Enable this to receive news and updates via Email.";

export default async function GeneralSettingPage() {
  const initialDevicePushNotificationStatus =
    await getDevicePushNotificationStatus();
  const initialEmailNotificationStatus = await getEmailNotificationStatus();
  const initialNewsStatus = await getNewsStatus();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">General Setting</h2>
      <div className="gap-2 flex py-2 flex-col bg-secondary text-secondary-foreground  rounded-lg shadow-md">
        {/* Device Push Notification Toggle */}
        <div>
          <SettingToggle
            initialState={initialDevicePushNotificationStatus}
            purpose={TOGGLE_TYPE.CHANGE_DEVICE_PUSH_NOTIFICATION_STATUS}
            label={DevicePushNotificationLabel}
            description={DevicePushNotificationDescription}
          />
        </div>

        <div className="border-secondary-foreground/20 border-b"></div>

        {/* Email Notification Toggle */}
        <div>
          <SettingToggle
            initialState={initialEmailNotificationStatus}
            purpose={TOGGLE_TYPE.CHANGE_EMAIL_NOTIFICATION_STATUS}
            label={EmailNotificationLabel}
            description={EmailNotificationDescription}
          />
        </div>
        <div className="border-secondary-foreground/20 border-b"></div>

        {/* News and Updates Toggle */}
        <div>
          <SettingToggle
            initialState={initialNewsStatus}
            purpose={TOGGLE_TYPE.CHANGE_NEWS_STATUS}
            label={NewsLabel}
            description={NewsDescription}
          />
        </div>
      </div>
    </div>
  );
}
