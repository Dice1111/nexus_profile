import ConnectionRequestList from "@/components/List/ConnectionRequestList";
import { fetchWithTryCatch } from "@/lib/utils";
import { fetchConnectionRequestData } from "@/services/contact-service";

export default async function RequestPage() {
  const requestData = await fetchWithTryCatch(fetchConnectionRequestData);
  return <ConnectionRequestList data={requestData} />;
}
