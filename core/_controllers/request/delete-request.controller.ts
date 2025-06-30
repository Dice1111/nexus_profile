import { DeleteRequestUseCase } from "@/core/_application/use-cases/request/delete-request.use-case";
import { InputParseError } from "@/core/_domain/errors/common.error";

export const deleteRequestController =
  (deleteRequestUseCase: DeleteRequestUseCase) =>
  async (requestId: number): Promise<void> => {
    if (typeof requestId !== "number" || isNaN(requestId)) {
      throw new InputParseError("Invalid Parsed Data", {
        cause: "Request Id must be a number",
      });
    }
    await deleteRequestUseCase(requestId);
  };
