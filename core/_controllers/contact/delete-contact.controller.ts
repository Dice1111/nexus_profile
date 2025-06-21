import { IDeleteContactUseCase } from "@/core/_application/use-cases/contact/delete-contact.use-case";
import { InputParseError } from "@/core/_domain/errors/common.error";

export const deleteContactController =
  (deleteContactUseCase: IDeleteContactUseCase) =>
  async (contactId: number): Promise<void> => {
    if (typeof contactId !== "number" || isNaN(contactId)) {
      throw new InputParseError("Invalid Parsed Data", {
        cause: "Contact Id must be a number",
      });
    }
    await deleteContactUseCase(contactId);
  };
