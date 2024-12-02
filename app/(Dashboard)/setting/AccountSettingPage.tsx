import SettingAccount from "@/components/Setting/SettingAccount";
import { fetchWithTryCatch } from "@/lib/utils";
import { getSettingAccountData } from "@/services/setting-service";

export default async function AccountSettingsPageClient() {
  const settingAccountData = await fetchWithTryCatch(getSettingAccountData);

  return <SettingAccount {...settingAccountData} />;
}
