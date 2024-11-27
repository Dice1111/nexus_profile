"use client";

import ConnectionRequestList from "@/components/List/ConnectionRequestList";
import NavBar, { NavBarNavigation } from "@/components/NavBar/NavBar";
import { columns } from "@/components/Table/contact/column";
import { DataTable } from "@/components/Table/contact/data-table";
import { Contact } from "@/lib/type";
import { ConnectionRequestWithDetails } from "@/services/contact-service";
import { useState } from "react";

enum CONTACT_PANEL {
  CONNECTION,
  REQUEST,
}

interface ClientSideContactPageProps {
  contactData: Contact[];
  requestData: ConnectionRequestWithDetails[];
}

const navItems: NavBarNavigation<CONTACT_PANEL>[] = [
  { label: "Connection", panel: CONTACT_PANEL.CONNECTION },
  { label: "Request", panel: CONTACT_PANEL.REQUEST },
];

export default function ClientSideContactPage({
  contactData,
  requestData,
}: ClientSideContactPageProps) {
  const [currentPanelType, setCurrentPanelType] = useState<CONTACT_PANEL>(
    CONTACT_PANEL.CONNECTION
  );

  const ContactPanelComponents = {
    [CONTACT_PANEL.CONNECTION]: (
      <DataTable columns={columns} data={contactData} />
    ),
    [CONTACT_PANEL.REQUEST]: <ConnectionRequestList data={requestData} />,
  };

  return (
    <>
      <div className="mb-6">
        <NavBar
          data={navItems}
          onPanelChange={setCurrentPanelType}
          currentPanel={currentPanelType}
        />
      </div>
      {ContactPanelComponents[currentPanelType]}
    </>
  );
}
