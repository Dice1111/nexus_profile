import { columns } from "@/components/Table/contact/column";
import { DataTable } from "@/components/Table/contact/data-table";
import { fetchWithTryCatch } from "@/lib/utils";
import { fetchContactData } from "@/services/contact-service";

export default async function ContactPage() {
  const contactData = await fetchWithTryCatch(fetchContactData);
  return <DataTable columns={columns} data={contactData}></DataTable>;
}
