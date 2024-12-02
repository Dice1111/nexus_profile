import NavBar from "@/components/NavBar/NavBar";
import { PROFILE_PANEL } from "@/lib/navbar/enum";
import { NavBarNavigation } from "@/lib/navbar/type";
import DesignEditModal from "./DesignEditModal";
import FieldsEditModal from "./FieldsEditModal";
import InformationEditModal from "./InformationEditModal";

const navItems: NavBarNavigation<PROFILE_PANEL>[] = [
  { label: "Display", panel: PROFILE_PANEL.Design },
  { label: "Fields", panel: PROFILE_PANEL.Fields },
  { label: "Information", panel: PROFILE_PANEL.Information },
];

export default async function ProfileEditor() {
  return (
    <div
      className=" w-[500px]  sticky top-12 bg-background  shadow-2xl  overflow-auto p-4 flex flex-col gap-3"
      style={{ height: `calc(100vh - 48px)` }}
    >
      <NavBar data={navItems}>
        <div id={PROFILE_PANEL.Design}>
          <DesignEditModal />
        </div>
        <div id={PROFILE_PANEL.Information}>
          <InformationEditModal />
        </div>
        <div id={PROFILE_PANEL.Fields}>
          <FieldsEditModal />
        </div>
      </NavBar>
    </div>
  );
}
