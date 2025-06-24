import { InfoBox, InfoBox_Type, InfoBoxProps } from "@/components/Box/InfoBox";
import { FollowerAndRequestChart } from "@/components/Chart/FollowerAndRequestChart";
import { fetchWithTryCatch } from "@/lib/utils";
import {
  fetchConnectionAndVisitorChartData,
  fetchConnectionCount,
  fetchContactSavedCount,
  fetchViewCount,
} from "@/services/analytic-service";
import { fetchOverviewStatisticByCardIdAction } from "./action";

export default async function Page() {
  const connectionAndVisitorChartData = await fetchWithTryCatch(
    fetchConnectionAndVisitorChartData
  );
  const cardId = "1c41b717-d565-47f6-a569-10774f2c8d4b";

  const { contactCount, followerCount, requestCount } =
    await fetchOverviewStatisticByCardIdAction(cardId);

  const TotalFollowerData = {
    title: "Followers",
    description: "Total number of users who saved your contact",
    value: followerCount,
    type: InfoBox_Type.FOLLOWER,
  };
  const TotalConnectionData = {
    title: "Connections",
    description: "Total number of users you are connected with",
    value: contactCount,
    type: InfoBox_Type.CONNECTION,
  };

  const TotalRequestDat = {
    title: "Requests",
    description: "Total number of users who shared their contact with you",
    value: requestCount,
    type: InfoBox_Type.REQUEST,
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold  ">Overview</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="mt-4 grid grid-cols-1 xl:grid-cols-6 gap-4">
          <div className="col-span-1 xl:col-span-2 ">
            <InfoBox data={TotalFollowerData} />
          </div>

          <div className=" col-span-1 xl:col-span-2 ">
            <InfoBox data={TotalConnectionData} />
          </div>

          <div className="col-span-1  xl:col-span-2">
            <InfoBox data={TotalRequestDat} />
          </div>
        </div>

        <div>
          <FollowerAndRequestChart chartData={connectionAndVisitorChartData} />
        </div>
      </div>
    </div>
  );
}
