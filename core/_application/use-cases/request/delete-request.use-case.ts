import { IRequestRepository } from "@/core/_domain/repositories/IRequestRepository";

export type IDeleteRequestUseCase = ReturnType<typeof deleteRequestUseCase>;

export const deleteRequestUseCase =
  (requestRepository: IRequestRepository) =>
  async (requestId: number): Promise<void> => {
    await requestRepository.delete(requestId);
  };
