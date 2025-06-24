import { deleteContactUseCase } from "@/core/_application/use-cases/contact/delete-contact.use-case";
import { deleteContactController } from "@/core/_controllers/contact/delete-contact.controller";
import { ContactRepository } from "@/core/_infrastructure/repositories/contact.repository";

export default function buildDeleteContactController() {
  const contactRepository = new ContactRepository();
  const deleteContact = deleteContactUseCase(contactRepository);
  return deleteContactController(deleteContact);
}
