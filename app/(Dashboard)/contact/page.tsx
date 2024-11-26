import { columns } from "@/components/Table/contact/column";
import { DataTable } from "@/components/Table/contact/data-table";
import { fetchWithTryCatch } from "@/lib/utils";
import { fetchContactData } from "@/services/contact-service";

// export enum Panel {
//   Connections,
//   Requests,
// }
// const PanelComponents = {
//   [Panel.Design]: <DesignEditModal />,
//   [Panel.Information]: <InformationEditModal />,
//   [Panel.Fields]: <FieldsEditModal />,
// };
// const navItems: NavBarNavigation[] = [
//   { label: "Display", panel: Panel.Design },
//   { label: "Fields", panel: Panel.Fields },
//   { label: "Information", panel: Panel.Information },
// ];

export default async function Page() {
  const data = await fetchWithTryCatch(fetchContactData);

  return (
    <div className="container px-4 pt-4 mx-auto ">
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
