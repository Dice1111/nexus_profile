import { FetchDailyFollowerCountByCardIdUseCase } from "@/core/_application/use-cases/contact/fetch-daily-follower-count-by-card-id.use-case";
import { FetchTotalContactCountByCardIdUseCase } from "@/core/_application/use-cases/contact/fetch-total-contact-count-by-card-id.use-case";
import { FetchTotalFollowerCountByCardIdUseCase } from "@/core/_application/use-cases/contact/fetch-total-follower-count-by-card-id.use-case";
import { FetchTotalRequestCountByCardIdUseCase } from "@/core/_application/use-cases/request/fetch-total-request-count-by-card-id.use-case";
import { InputParseError } from "@/core/_domain/errors/common.error";
import { IDailyFollowerCountChartResponse } from "@/core/_domain/types/contact-repository.types";

export const fetchOverviewStatisticByCardIdController =
  (
    fetchTotalContactCountByCardIdUseCase: FetchTotalContactCountByCardIdUseCase,
    fetchTotalFollowerCountByCardIdUseCase: FetchTotalFollowerCountByCardIdUseCase,
    fetchTotalRequestCountByCardIdUseCase: FetchTotalRequestCountByCardIdUseCase,
    fetchDailyFollowerCountByCardIdUseCase: FetchDailyFollowerCountByCardIdUseCase
  ) =>
  async (
    cardId: string
  ): Promise<{
    contactCount: number;
    followerCount: number;
    requestCount: number;
    dailyFollowerChartData: IDailyFollowerCountChartResponse[];
  }> => {
    if (typeof cardId !== "string" || cardId === "") {
      throw new InputParseError("Invalid Parsed Data", {
        cause: "Card ID must be a non-empty string",
      });
    }

    const [contactCount, followerCount, requestCount, dailyFollowerChartData] =
      await Promise.all([
        fetchTotalContactCountByCardIdUseCase(cardId),
        fetchTotalFollowerCountByCardIdUseCase(cardId),
        fetchTotalRequestCountByCardIdUseCase(cardId),
        fetchDailyFollowerCountByCardIdUseCase(cardId),
      ]);

    // console.log(dailyfollowerCount);

    return {
      contactCount,
      followerCount,
      requestCount,
      dailyFollowerChartData,
    };
  };
