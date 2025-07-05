import { IRequestRepository } from "@/core/_domain/repositories/IRequestRepository";

export type FetchTotalRequestCountByCardIdUseCase = ReturnType<
  typeof fetchTotalRequestCountByCardIdUseCase
>;

export const fetchTotalRequestCountByCardIdUseCase =
  (requestRepository: IRequestRepository) =>
  async (cardId: string[]): Promise<number> => {
    const count = await requestRepository.fetchTotalRequestCountByCardId(
      cardId
    );

    return count;
  };
