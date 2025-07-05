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
    cardId: string[]
  ): Promise<{
    contactCount: number;
    followerCount: number;
    requestCount: number;
    dailyFollowerChartData: IDailyFollowerCountChartResponse[];
  }> => {
    const isValidArray =
      Array.isArray(cardId) &&
      cardId.length > 0 &&
      cardId.every((id) => typeof id === "string" && id.trim() !== "");

    if (!isValidArray) {
      throw new InputParseError("Invalid Data", {
        cause: "Card ID must be a non-empty array of strings",
      });
    }

    const [contactCount, followerCount, requestCount, dailyFollowerChartData] =
      await Promise.all([
        fetchTotalContactCountByCardIdUseCase(cardId),
        fetchTotalFollowerCountByCardIdUseCase(cardId),
        fetchTotalRequestCountByCardIdUseCase(cardId),
        fetchDailyFollowerCountByCardIdUseCase(cardId),
      ]);

    return {
      contactCount,
      followerCount,
      requestCount,
      dailyFollowerChartData,
    };
  };
