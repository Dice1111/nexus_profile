import { SettingAccountDataType } from "@/lib/setting/type";

export async function getDevicePushNotificationStatus(): Promise<boolean> {
  return false; // Simulate fetching initial state
}

export async function getEmailNotificationStatus(): Promise<boolean> {
  return false; // Simulate fetching initial state
}

export async function getNewsStatus(): Promise<boolean> {
  return false; // Simulate fetching initial state
}

export async function getSettingAccountData(): Promise<SettingAccountDataType> {
  return {
    id: "1",
    firstName: "John Doe",
    lastName: "Doe",
    email: "john.doe@example.com",
  };
}
