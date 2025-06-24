import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";
import { IDailyFollowerCountChartData } from "@/core/_domain/repositories/types/contact.types";

export type IFetchDailyFollowerCountByCardIdUseCase = ReturnType<
  typeof fetchDailyFollowerCountByCardIdUseCase
>;

export const fetchDailyFollowerCountByCardIdUseCase =
  (contactRepository: IContactRepository) =>
  async (cardId: string): Promise<IDailyFollowerCountChartData[]> => {
    const rawData = await contactRepository.fetchDailyFollowerCountByCardId(
      cardId
    );
    console.log("db", rawData);

    // Step 1: Create a map from DB result: date string -> count
    const dbMap = new Map<string, number>();
    for (const item of rawData) {
      const dateStr = item.date.toISOString().split("T")[0];
      dbMap.set(dateStr, Number(item.count));
    }
    console.log("dbMap", dbMap);

    // Step 2: Generate the final merged 90-day array directly
    const result: { date: string; count: number }[] = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      result.push({
        date: dateStr, // final format is string (ideal for FE)
        count: dbMap.get(dateStr) ?? 0,
      });
    }
    console.log("final", result);

    return result;
  };
