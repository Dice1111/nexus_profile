import { InfoBox, InfoBox_Type } from "@/components/Box/InfoBox";

import FollowerAndRequestChart from "@/components/Chart/FollowerAndRequestChart";
import { fetchOverviewStatisticByCardIdAction } from "./action";
import OverviewSkeleton from "@/components/skeleton/OverviewSkeleton";

export default async function Page() {
  const cardId = "ca2ca944-959f-4d4d-8ec1-5f5b8066ec2b";

  const { contactCount, followerCount, requestCount, dailyFollowerChartData } =
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
    <div className="grid grid-cols-1 gap-4 ">
      <div className=" grid grid-cols-1 xl:grid-cols-6 gap-4">
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
        <FollowerAndRequestChart chartData={dailyFollowerChartData} />
      </div>
    </div>
  );
}
