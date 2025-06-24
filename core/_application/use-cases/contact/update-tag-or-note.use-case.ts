import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";
import { IUpdateTagOrNoteData } from "@/schema/contact/update-contact-or-delete.schema";

export type IUpdateTagOrNoteUseCase = ReturnType<typeof updateTagOrNoteUseCase>;

export const updateTagOrNoteUseCase =
  (contactRepository: IContactRepository) =>
  async (data: IUpdateTagOrNoteData): Promise<void> => {
    await contactRepository.updateTagOrNote(data);
  };
