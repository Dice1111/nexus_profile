import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";
import { CreateContactInput } from "@/core/_domain/types/contact-repository.types";

export type CreateContactUseCase = ReturnType<typeof createContactUseCase>;

export const createContactUseCase =
  (contactRepository: IContactRepository) =>
  async (data: CreateContactInput): Promise<void> => {
    await contactRepository.create(data);
  };
