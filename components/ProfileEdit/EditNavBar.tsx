import React, { useState } from "react";
import DesignEditModal from "./DesignEditModal";
import FieldsEditModal from "./FieldsEditModal";
import InformationEditModal from "./InformationEditModal";

interface EditNavBarProps {
  onEditPanelChange: (panel: JSX.Element) => void;
}

enum Panel {
  Design,
  Information,
  Fields,
}

const PanelComponents = {
  [Panel.Design]: <DesignEditModal />,
  [Panel.Information]: <InformationEditModal />,
  [Panel.Fields]: <FieldsEditModal />,
};

const navItems = [
  { label: "Display", panel: Panel.Design },
  { label: "Fields", panel: Panel.Fields },
  { label: "Information", panel: Panel.Information },
];

export default function EditNavBar({ onEditPanelChange }: EditNavBarProps) {
  const [activePanel, setActivePanel] = useState<Panel>(Panel.Design);

  const handleEditPanelChange = (panel: Panel) => {
    setActivePanel(panel);
    onEditPanelChange(PanelComponents[panel]);
  };

  return (
    <div className="flex h-16 gap-10 ">
      {navItems.map((item) => (
        <button
          key={item.panel}
          onClick={() => handleEditPanelChange(item.panel)}
          className={` transition ${
            activePanel === item.panel
              ? "border-b-2  font-bold"
              : "hover:border-b-2 hover:border-gray-400"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
