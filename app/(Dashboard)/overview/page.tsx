import { InfoBox, InfoBox_Type, InfoBoxProps } from "@/components/Box/InfoBox";
import { ConnectionAndVisitorChart } from "@/components/Chart/ConnectionAndVisitorChart";
import { fetchWithTryCatch } from "@/lib/utils";
import {
  fetchConnectionAndVisitorChartData,
  fetchConnectionCount,
  fetchContactSavedCount,
  fetchViewCount,
} from "@/services/analytic-service";

export default async function Page() {
  const viewCount = await fetchWithTryCatch(fetchViewCount);
  const contactSavedCount = await fetchWithTryCatch(fetchContactSavedCount);
  const connectionCount = await fetchWithTryCatch(fetchConnectionCount);
  const connectionAndVisitorChartData = await fetchWithTryCatch(
    fetchConnectionAndVisitorChartData
  );
  const TotalViewCountData: InfoBoxProps = {
    title: "Views",
    description: "Total Profile Views",
    value: viewCount,
    type: InfoBox_Type.VIEW,
  };

  const TotalContactSavedCountData: InfoBoxProps = {
    title: "Contacts Saved",
    description: "Total Contacts Saved",
    value: contactSavedCount,
    type: InfoBox_Type.CONTACT,
  };

  const TotalFollowerData: InfoBoxProps = {
    title: "Connections",
    description: "Total Connections",
    value: connectionCount,
    type: InfoBox_Type.CONNECTION,
  };

  return (
    <>
      <div className="container mx-auto px-4 pt-4">
        <h2 className="text-xl font-bold  ">Overview</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="mt-4 grid grid-cols-1 xl:grid-cols-6 gap-4">
            <div className="col-span-1 xl:col-span-2 ">
              <InfoBox {...TotalViewCountData} />
            </div>

            <div className=" col-span-1 xl:col-span-2 ">
              <InfoBox {...TotalContactSavedCountData} />
            </div>

            <div className="col-span-1  xl:col-span-2">
              <InfoBox {...TotalFollowerData} />
            </div>
          </div>

          <div>
            <ConnectionAndVisitorChart
              chartData={connectionAndVisitorChartData}
            />
          </div>
        </div>
      </div>
    </>
  );
}
