import NavBar, { NavBarNavigation } from "@/components/NavBar/NavBar";
import GeneralSettingPage from "./GeneralSettingPage";
import AccountSettingsPage from "./AccountSettingPage";

enum SETTING_PANEL {
  GENERAL = "general",
  ACCOUNT = "account",
}

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
          <AccountSettingsPage
            profileData={{
              name: "John Doe",
              email: "johndoe@example.com",
              profilePicture: null, // Replace with URL if available
            }}
          />
        </div>
      </NavBar>
    </div>
  );
}
