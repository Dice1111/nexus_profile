export interface NavBarNavigation<T> {
  label: string;
  panel: T;
}

interface NavBarProps<T> {
  data: NavBarNavigation<T>[];
  onPanelChange: (panel: T) => void;
  currentPanel: T;
}

export default function NavBar<T>({
  data,
  onPanelChange,
  currentPanel,
}: NavBarProps<T>) {
  return (
    <nav className="flex gap-4">
      {data.map((item) => (
        <button
          key={String(item.panel)} // Ensure uniqueness by converting the panel to a string
          onClick={() => onPanelChange(item.panel)}
          className={`transition ${
            currentPanel === item.panel
              ? "border-b-2 font-bold"
              : "font-thin hover:border-b-2 hover:border-gray-400"
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
