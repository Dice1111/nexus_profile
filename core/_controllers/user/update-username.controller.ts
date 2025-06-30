import { UpdateUsernameUseCase } from "@/core/_application/use-cases/user/update-username.use-case";
import { InputParseError } from "@/core/_domain/errors/common.error";
import {
  UpdateUsernameData,
  UpdateUsernameSchema,
} from "@/schema/user/update-username.schema";

export const updateUserNameController =
  (
    updateUsernameUseCase: UpdateUsernameUseCase,
    updateUsernameSchema: UpdateUsernameSchema
  ) =>
  async (data: UpdateUsernameData) => {
    const parsed = updateUsernameSchema.safeParse(data);
    if (!parsed.success) {
      throw new InputParseError("Invalid Data", {
        cause: parsed.error.format(),
      });
    }
    await updateUsernameUseCase(data.name);
  };
