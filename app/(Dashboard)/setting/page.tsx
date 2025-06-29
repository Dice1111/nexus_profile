import SettingAccount from "@/components/SettingComponent/SettingAccount";
import { fetchUserSettingDataAction } from "./action";

export default async function Page() {
  const userSettingData = await fetchUserSettingDataAction();
  return <SettingAccount data={userSettingData.data} />;
}
