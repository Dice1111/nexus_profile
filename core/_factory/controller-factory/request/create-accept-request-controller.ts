import { createContactUseCase } from "@/core/_application/use-cases/contact/create-contact.use-case";
import { deleteRequestUseCase } from "@/core/_application/use-cases/request/delete-request.use-case";
import { acceptRequestController } from "@/core/_controllers/request/accept-request.controller";
import { ContactRepository } from "@/core/_infrastructure/repositories/contact.repository";
import { RequestRepository } from "@/core/_infrastructure/repositories/request.repository";
import { AcceptRequestSchema } from "@/schema/request/accept-request.schema";

export default function CreateAcceptRequestController() {
  const contactRepository = new ContactRepository();
  const requestRepository = new RequestRepository();
  const createContact = createContactUseCase(contactRepository);
  const deleteRequest = deleteRequestUseCase(requestRepository);
  return acceptRequestController(
    createContact,
    deleteRequest,
    AcceptRequestSchema
  );
}
