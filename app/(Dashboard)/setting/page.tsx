import SettingAccount from "@/components/SettingComponent/SettingAccount";
import { fetchWithTryCatch } from "@/lib/utils";
import { getSettingAccountData } from "@/services/setting-service";

export default async function Page() {
  const settingAccountData = await fetchWithTryCatch(getSettingAccountData);

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold  ">Account Setting</h2>
      <SettingAccount {...settingAccountData} />
    </div>
  );
}
