import { UpdateTagOrNoteUseCase } from "@/core/_application/use-cases/contact/update-tag-or-note.use-case";
import { InputParseError } from "@/core/_domain/errors/common.error";
import {
  IUpdateTagOrNoteData,
  IUpdateTagOrNoteSchema,
} from "@/schema/contact/update-contact-or-delete.schema";

export const updateTagOrNoteController =
  (
    updateTagOrNoteUseCase: UpdateTagOrNoteUseCase,
    UpdateTagOrNoteSchema: IUpdateTagOrNoteSchema
  ) =>
  async (data: IUpdateTagOrNoteData) => {
    const parsed = UpdateTagOrNoteSchema.safeParse(data);
    if (!parsed.success) {
      throw new InputParseError("Invalid Data", {
        cause: parsed.error.format(),
      });
    }
    await updateTagOrNoteUseCase(data);
  };
