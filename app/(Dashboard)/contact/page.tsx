import { columns } from "@/components/Table/contact/column";
import { DataTable } from "@/components/Table/contact/data-table";
import { fetchWithTryCatch } from "@/lib/utils";
import { fetchContactData } from "@/services/contact-service";

export default async function Page() {
  const data = await fetchWithTryCatch(fetchContactData);

  return (
    <div className="container px-4 pt-4 mx-auto ">
      <div className="bg-secondary text-secondary-foreground rounded-lg p-4 ">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
