import { IDeleteRequestUseCase } from "@/core/_application/use-cases/request/delete-request.use-case";
import { InputParseError } from "@/core/_domain/errors/common.error";

export const deleteRequestController =
  (deleteRequestUseCase: IDeleteRequestUseCase) =>
  async (requestId: number): Promise<void> => {
    if (!requestId) throw new InputParseError("Request Id is not valid");
    await deleteRequestUseCase(requestId);
  };
