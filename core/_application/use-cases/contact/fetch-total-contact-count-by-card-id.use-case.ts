import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";

export type FetchTotalContactCountByCardIdUseCase = ReturnType<
  typeof fetchTotalContactCountByCardIdUseCase
>;

export const fetchTotalContactCountByCardIdUseCase =
  (contactRepository: IContactRepository) =>
  async (cardId: string[]): Promise<number> => {
    const count = await contactRepository.fetchTotalContactCountByCardId(
      cardId
    );

    return count;
  };
