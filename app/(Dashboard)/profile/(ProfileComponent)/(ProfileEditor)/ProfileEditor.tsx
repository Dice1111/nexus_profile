import NavBar, { NavBarNavigation } from "@/components/NavBar/NavBar";
import { useState } from "react";
import DesignEditModal from "./DesignEditModal";
import FieldsEditModal from "./FieldsEditModal";
import InformationEditModal from "./InformationEditModal";

export enum Panel {
  Design,
  Information,
  Fields,
}
const PanelComponents = {
  [Panel.Design]: <DesignEditModal />,
  [Panel.Information]: <InformationEditModal />,
  [Panel.Fields]: <FieldsEditModal />,
};
const navItems: NavBarNavigation[] = [
  { label: "Display", panel: Panel.Design },
  { label: "Fields", panel: Panel.Fields },
  { label: "Information", panel: Panel.Information },
];

export default function ProfileEditor() {
  const [currentPanelType, setcurrentPanelType] = useState<Panel>(Panel.Design);

  return (
    <div
      className=" w-[500px] sticky top-12 bg-background  shadow-2xl  overflow-auto p-4 flex flex-col gap-3"
      style={{ height: `calc(100vh - 48px)` }}
    >
      <NavBar
        data={navItems}
        onPanelChange={setcurrentPanelType}
        currentPanel={currentPanelType}
      />
      {PanelComponents[currentPanelType]}
    </div>
  );
}
