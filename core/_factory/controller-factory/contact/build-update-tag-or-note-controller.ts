import { updateTagOrNoteUseCase } from "@/core/_application/use-cases/contact/update-tag-or-note.use-case";
import { updateTagOrNoteController } from "@/core/_controllers/contact/update-tag-or-note.controller";
import { ContactRepository } from "@/core/_infrastructure/repositories/contact.repository";
import { UpdateTagOrNoteSchema } from "@/schema/contact/update-contact-or-delete.schema";

export default function buildUpdateTagOrNoteController() {
  const contactRepository = new ContactRepository();
  const updateTagOrNote = updateTagOrNoteUseCase(contactRepository);
  return updateTagOrNoteController(updateTagOrNote, UpdateTagOrNoteSchema);
}
