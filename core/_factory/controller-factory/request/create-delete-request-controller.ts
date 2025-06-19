import { deleteRequestUseCase } from "@/core/_application/use-cases/request/delete-request.use-case";
import { deleteRequestController } from "@/core/_controllers/request/delete-request.controller";
import { RequestRepository } from "@/core/_infrastructure/repositories/request.repository";

export default function CreateDeleteRequestController() {
  const requestRepository = new RequestRepository();
  const deleteRequest = deleteRequestUseCase(requestRepository);
  return deleteRequestController(deleteRequest);
}
