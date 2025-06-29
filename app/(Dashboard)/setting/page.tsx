import SettingAccount from "@/components/SettingComponent/SettingAccount";
import { fetchUserSettingDataAction } from "./action";

export default async function Page() {
  const userSettingData = await fetchUserSettingDataAction();
  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold  ">Account Setting</h2>
      <SettingAccount data={userSettingData.data} />
    </div>
  );
}
