import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";
import { IDailyFollowerCountData } from "@/core/_domain/repositories/types/contact.types";

export type IFetchDailyFollowerCountByCardIdUseCase = ReturnType<
  typeof fetchDailyFollowerCountByCardIdUseCase
>;

export const fetchDailyFollowerCountByCardIdUseCase =
  (contactRepository: IContactRepository) =>
  async (cardId: string): Promise<IDailyFollowerCountData[]> => {
    const data = await contactRepository.fetchDailyFollowerCountByCardId(
      cardId
    );
    return data;
  };
