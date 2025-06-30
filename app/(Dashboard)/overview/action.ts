"use server";

import { IDailyFollowerCountChartResponse } from "@/core/_domain/types/contact-repository.types";
import buildFetchOverviewStatisticByCardId from "@/core/_factory/controller-factory/overview/build-fetch-overview-statistic-by-card-id-controller";

export interface IFetchOverviewStatisticByCardIdActionState {
  success: boolean;
  contactCount: number;
  followerCount: number;
  requestCount: number;
  dailyFollowerChartData: IDailyFollowerCountChartResponse[];
}

export async function fetchOverviewStatisticByCardIdAction(
  cardId: string
): Promise<IFetchOverviewStatisticByCardIdActionState> {
  try {
    const fetchOverviewStatisticByCardId =
      buildFetchOverviewStatisticByCardId();
    const data = await fetchOverviewStatisticByCardId(cardId);

    return {
      success: true,
      contactCount: data.contactCount,
      followerCount: data.followerCount,
      requestCount: data.requestCount,
      dailyFollowerChartData: data.dailyFollowerChartData,
    };
  } catch (error) {
    throw error;
  }
}
