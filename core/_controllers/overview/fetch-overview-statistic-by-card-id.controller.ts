import { IFetchDailyFollowerCountByCardIdUseCase } from "@/core/_application/use-cases/contact/fetch-daily-follower-count-by-card-id.use-case";
import { IFetchTotalContactCountByCardIdUseCase } from "@/core/_application/use-cases/contact/fetch-total-contact-count-by-card-id.use-case";
import { IFetchTotalFollowerCountByCardIdUseCase } from "@/core/_application/use-cases/contact/fetch-total-follower-count-by-card-id.use-case";
import { IFetchTotalRequestCountByCardIdUseCase } from "@/core/_application/use-cases/request/fetch-total-request-count-by-card-id.use-case";
import { InputParseError } from "@/core/_domain/errors/common.error";

export const fetchOverviewStatisticByCardIdController =
  (
    fetchTotalContactCountByCardIdUseCase: IFetchTotalContactCountByCardIdUseCase,
    fetchTotalFollowerCountByCardIdUseCase: IFetchTotalFollowerCountByCardIdUseCase,
    fetchTotalRequestCountByCardIdUseCase: IFetchTotalRequestCountByCardIdUseCase,
    fetchDailyFollowerCountByCardIdUseCase: IFetchDailyFollowerCountByCardIdUseCase
  ) =>
  async (
    cardId: string
  ): Promise<{
    contactCount: number;
    followerCount: number;
    requestCount: number;
  }> => {
    if (typeof cardId !== "string" || cardId === "") {
      throw new InputParseError("Invalid Parsed Data", {
        cause: "Card ID must be a non-empty string",
      });
    }

    const [contactCount, followerCount, requestCount, dailyfollowerCount] =
      await Promise.all([
        fetchTotalContactCountByCardIdUseCase(cardId),
        fetchTotalFollowerCountByCardIdUseCase(cardId),
        fetchTotalRequestCountByCardIdUseCase(cardId),
        fetchDailyFollowerCountByCardIdUseCase(cardId),
      ]);

    console.log(dailyfollowerCount[0].count);

    return {
      contactCount,
      followerCount,
      requestCount,
    };
  };
