import { CreateContactUseCase } from "@/core/_application/use-cases/contact/create-contact.use-case";
import { DeleteRequestUseCase } from "@/core/_application/use-cases/request/delete-request.use-case";
import { InputParseError } from "@/core/_domain/errors/common.error";
import {
  IAcceptRequestData,
  IAcceptRequestSchema,
} from "@/schema/request/accept-request.schema";

export const acceptRequestController =
  (
    createContactUseCase: CreateContactUseCase,
    deleteRequestUseCase: DeleteRequestUseCase,
    acceptRequestSchema: IAcceptRequestSchema
  ) =>
  async (data: IAcceptRequestData) => {
    const parsed = acceptRequestSchema.safeParse(data);
    if (!parsed.success) {
      throw new InputParseError("Invalid Data", {
        cause: parsed.error.format(),
      });
    }
    await createContactUseCase({
      cardId: data.cardId,
      contactCardId: data.senderCardId,
    });

    await deleteRequestUseCase(data.requestId);
  };
