import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";

export type IDeleteContactUseCase = ReturnType<typeof deleteContactUseCase>;

export const deleteContactUseCase =
  (contactRepository: IContactRepository) =>
  async (contactId: number): Promise<void> => {
    await contactRepository.delete(contactId);
  };
