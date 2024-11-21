import { useState } from "react";
import DesignEditModal from "./DesignEditModal";
import EditNavBar from "./EditNavBar";

export default function profileEditor() {
  const [editPanelModal, setEditPanelModal] = useState<JSX.Element>(
    <DesignEditModal />
  );

  return (
    <div className=" w-[500px]  h-viewport shadow-2xl  overflow-auto p-4 flex flex-col gap-3">
      <EditNavBar onEditPanelChange={setEditPanelModal} />
      <div>{editPanelModal}</div>
    </div>
  );
}
