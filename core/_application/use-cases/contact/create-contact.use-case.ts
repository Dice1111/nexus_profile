import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";
import { ICreateContactData } from "@/core/_domain/repositories/types/request.type";

export type ICreateContactUseCase = ReturnType<typeof createContactUseCase>;

export const createContactUseCase =
  (contactRepository: IContactRepository) =>
  async (data: ICreateContactData): Promise<void> => {
    await contactRepository.create(data);
  };
