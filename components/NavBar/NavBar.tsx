import { Panel } from "../../app/(Dashboard)/(Profile)/profile/(ProfileComponent)/(ProfileEdit)/ProfileEditor";

export interface NavBarNavigation {
  label: string;
  panel: Panel;
}

interface NavBarProps {
  data: NavBarNavigation[];
  onPanelChange: (panel: Panel) => void;
  currentPanel: Panel;
}

export default function NavBar({
  data,
  onPanelChange,
  currentPanel,
}: NavBarProps) {
  return (
    <nav className="flex gap-4">
      {data.map((item) => (
        <button
          key={item.panel}
          onClick={() => onPanelChange(item.panel)}
          className={` transition ${
            currentPanel === item.panel
              ? "border-b-2  font-bold"
              : "font-thin hover:border-b-2 hover:border-gray-400"
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
