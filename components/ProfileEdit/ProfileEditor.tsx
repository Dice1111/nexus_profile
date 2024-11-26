import { useState } from "react";
import DesignEditModal from "./DesignEditModal";
import FieldsEditModal from "./FieldsEditModal";
import InformationEditModal from "./InformationEditModal";
import NavBar, { NavBarNavigation } from "../NavBar/NavBar";

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
    <div className=" w-[500px]  h-viewport shadow-2xl  overflow-auto p-4 flex flex-col gap-3">
      <NavBar
        data={navItems}
        onPanelChange={setcurrentPanelType}
        currentPanel={currentPanelType}
      />
      {PanelComponents[currentPanelType]}
    </div>
  );
}
