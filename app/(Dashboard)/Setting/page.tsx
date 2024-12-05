import NavBar from "@/components/NavBar/NavBar";
import { SETTING_PANEL } from "@/lib/navbar/enum";
import { NavBarNavigation } from "@/lib/navbar/type";
import AccountSettingPage from "./AccountSettingPage";
import GeneralSettingPage from "./GeneralSettingPage";

const navItems: NavBarNavigation<SETTING_PANEL>[] = [
  { label: "General", panel: SETTING_PANEL.GENERAL },
  { label: "Account", panel: SETTING_PANEL.ACCOUNT },
];

export default async function Page() {
  return (
    <div className="container px-4 pt-4 mx-auto">
      <NavBar data={navItems}>
        <div id={SETTING_PANEL.GENERAL}>
          <GeneralSettingPage />
        </div>
        <div id={SETTING_PANEL.ACCOUNT}>
          <AccountSettingPage />
        </div>
      </NavBar>
    </div>
  );
}
