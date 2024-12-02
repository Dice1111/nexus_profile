import { fetchWithTryCatch } from "@/lib/utils";
import {
  fetchConnectionRequestData,
  fetchContactData,
} from "@/services/contact-service";

import ConnectionRequestList from "@/components/List/ConnectionRequestList";
import NavBar, { NavBarNavigation } from "@/components/NavBar/NavBar";
import { columns } from "@/components/Table/contact/column";
import { DataTable } from "@/components/Table/contact/data-table";

enum CONTACT_PANEL {
  CONNECTION = "connection",
  REQUEST = "request",
}

const navItems: NavBarNavigation<CONTACT_PANEL>[] = [
  { label: "Connection", panel: CONTACT_PANEL.CONNECTION },
  { label: "Request", panel: CONTACT_PANEL.REQUEST },
];

export default async function Page() {
  const AllContactData = await fetchWithTryCatch(fetchContactData);
  const ConnectionRequestData = await fetchWithTryCatch(
    fetchConnectionRequestData
  );

  return (
    <div className="container px-4 pt-4 mx-auto">
      <NavBar data={navItems}>
        <div id={CONTACT_PANEL.CONNECTION}>
          <DataTable columns={columns} data={AllContactData}></DataTable>
        </div>
        <div id={CONTACT_PANEL.REQUEST}>
          <ConnectionRequestList data={ConnectionRequestData} />
        </div>
      </NavBar>
    </div>
  );
}
