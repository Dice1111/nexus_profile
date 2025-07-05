import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";
import { IDailyFollowerCountChartResponse } from "@/core/_domain/types/contact-repository.types";

export type FetchDailyFollowerCountByCardIdUseCase = ReturnType<
  typeof fetchDailyFollowerCountByCardIdUseCase
>;

export const fetchDailyFollowerCountByCardIdUseCase =
  (contactRepository: IContactRepository) =>
  async (cardId: string[]): Promise<IDailyFollowerCountChartResponse[]> => {
    const rawData = await contactRepository.fetchDailyFollowerCountByCardId(
      cardId
    );

    const dbMap = new Map<string, number>();
    for (const item of rawData) {
      const dateStr = item.date.toISOString().split("T")[0];
      dbMap.set(dateStr, Number(item.count));
    }

    const result: { date: string; count: number }[] = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      result.push({
        date: dateStr,
        count: dbMap.get(dateStr) ?? 0,
      });
    }

    return result;
  };
