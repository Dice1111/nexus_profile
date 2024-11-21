import React from "react";
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
  { label: "Design", panel: Panel.Design },
  { label: "Info", panel: Panel.Information },
  { label: "Fields", panel: Panel.Fields },
];

export default function EditNavBar({ onEditPanelChange }: EditNavBarProps) {
  const handleEditPanelChange = (panel: keyof typeof PanelComponents) => {
    onEditPanelChange(PanelComponents[panel]);
  };

  return (
    <div className="bg-blue-500 flex gap-10">
      {navItems.map((item) => (
        <button
          key={item.panel}
          onClick={() => handleEditPanelChange(item.panel)}
          className="text-white hover:text-blue-200 transition"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
