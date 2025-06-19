import { ICreateContactUseCase } from "@/core/_application/use-cases/contact/create-contact.use-case";
import { IDeleteRequestUseCase } from "@/core/_application/use-cases/request/delete-request.use-case";
import { InputParseError } from "@/core/_domain/errors/common.error";
import {
  IAcceptRequestData,
  IAcceptRequestSchema,
} from "@/schema/request/accept-request.schema";

export const acceptRequestController =
  (
    createContactUseCase: ICreateContactUseCase,
    deleteRequestUseCase: IDeleteRequestUseCase,
    acceptRequestSchema: IAcceptRequestSchema
  ) =>
  async (data: IAcceptRequestData) => {
    const parsed = acceptRequestSchema.safeParse(data);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Invalid input";
      throw new InputParseError(firstError, {
        cause: parsed.error.format(),
      });
    }
    await createContactUseCase({
      cardId: data.cardId,
      contactCardId: data.senderCardId,
    });

    await deleteRequestUseCase(data.requestId);
  };
