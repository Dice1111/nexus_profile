import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";

export type FetchTotalFollowerCountByCardIdUseCase = ReturnType<
  typeof fetchTotalFollowerCountByCardIdUseCase
>;

export const fetchTotalFollowerCountByCardIdUseCase =
  (contactRepository: IContactRepository) =>
  async (cardId: string[]): Promise<number> => {
    const count = await contactRepository.fetchTotalFollowerCountByCardId(
      cardId
    );

    return count;
  };
