import { InfoBox, InfoBox_Type } from "@/components/Box/InfoBox";
import FollowerAndRequestChart from "@/components/Chart/FollowerAndRequestChart";
import { fetchOverviewStatisticByCardIdAction } from "./action";
import { IRawSearchParams } from "@/core/_domain/types/search-params-handler-service.type";
import { fetchCardIdandTitleByUserIdAction } from "../contact/connection/action";
import NoCardSkeleton from "@/components/Skeleton/NoCardSkeleton";
import { ALL_CARDS } from "@/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<IRawSearchParams>;
}) {
  const rawParams = await searchParams;
  let cardId = rawParams.cardId;
  const normalizedCardId =
    cardId === ALL_CARDS
      ? []
      : Array.isArray(cardId)
      ? cardId.filter((id) => id !== ALL_CARDS)
      : cardId
      ? [cardId]
      : [];

  let finalCardId: string[] = normalizedCardId;

  if (finalCardId.length === 0) {
    const cardsData = await fetchCardIdandTitleByUserIdAction();
    finalCardId = cardsData?.data?.map((card) => card.id) ?? [];
  }

  if (finalCardId.length === 0) {
    return <NoCardSkeleton />;
  }

  const { contactCount, followerCount, requestCount, dailyFollowerChartData } =
    await fetchOverviewStatisticByCardIdAction(finalCardId);

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

  const TotalRequestData = {
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
          <InfoBox data={TotalRequestData} />
        </div>
      </div>

      <div>
        <FollowerAndRequestChart chartData={dailyFollowerChartData} />
      </div>
    </div>
  );
}
