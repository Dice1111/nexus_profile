import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";

export type IFetchTotalContactCountByCardIdUseCase = ReturnType<
  typeof fetchTotalContactCountByCardIdUseCase
>;

export const fetchTotalContactCountByCardIdUseCase =
  (contactRepository: IContactRepository) =>
  async (cardId: string): Promise<number> => {
    const count = await contactRepository.fetchTotalContactCountByCardId(
      cardId
    );

    return count;
  };
