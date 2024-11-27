import {
  fetchConnectionRequestData,
  fetchContactData,
} from "@/services/contact-service";
import ClientSideContactPage from "./ClientSideContactPage";
import { fetchWithTryCatch } from "@/lib/utils";

export default async function ContactPage() {
  const AllContactData = await fetchWithTryCatch(fetchContactData);
  const ConnectionRequestData = await fetchWithTryCatch(
    fetchConnectionRequestData
  );

  return (
    <div className="container px-4 pt-4 mx-auto">
      <ClientSideContactPage
        contactData={AllContactData}
        requestData={ConnectionRequestData}
      />
    </div>
  );
}
