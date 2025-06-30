import { InfoBox, InfoBox_Type } from "@/components/Box/InfoBox";
import FollowerAndRequestChart from "@/components/Chart/FollowerAndRequestChart";
import { fetchOverviewStatisticByCardIdAction } from "./action";
import { IRawSearchParams } from "@/core/_domain/types/search-params-handler-service.type";
import { fetchCardIdandTitleByUserIdAction } from "../contact/connection/action";
import NoCardSkeleton from "@/components/skeleton/NoCardSkeleton";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<IRawSearchParams>;
}) {
  const rawParams = await searchParams;

  let cardId = rawParams.cardId;

  if (Array.isArray(cardId)) {
    cardId = cardId[0];
  }

  if (!cardId) {
    const cardsData = await fetchCardIdandTitleByUserIdAction();
    if (cardsData?.data?.length > 0) {
      cardId = cardsData.data[0].id;
    }
  }
  if (!cardId) {
    return <NoCardSkeleton />;
  }

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
