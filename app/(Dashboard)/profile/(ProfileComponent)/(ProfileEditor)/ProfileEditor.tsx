import NavBar, { NavBarNavigation } from "@/components/NavBar/NavBar";
import DesignEditModal from "./DesignEditModal";
import FieldsEditModal from "./FieldsEditModal";
import InformationEditModal from "./InformationEditModal";

//this page in running on server
enum Panel {
  Design = "design",
  Information = "information",
  Fields = "fields",
}

const navItems: NavBarNavigation<Panel>[] = [
  { label: "Display", panel: Panel.Design },
  { label: "Fields", panel: Panel.Fields },
  { label: "Information", panel: Panel.Information },
];

export default async function ProfileEditor() {
  return (
    <div
      className=" w-[500px]  sticky top-12 bg-background  shadow-2xl  overflow-auto p-4 flex flex-col gap-3"
      style={{ height: `calc(100vh - 48px)` }}
    >
      <NavBar data={navItems}>
        <div id={Panel.Design}>
          <DesignEditModal />
        </div>
        <div id={Panel.Information}>
          <InformationEditModal />
        </div>
        <div id={Panel.Fields}>
          <FieldsEditModal />
        </div>
      </NavBar>
    </div>
  );
}
