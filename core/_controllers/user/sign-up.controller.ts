import { SignUpUseCase } from "@/core/_application/use-cases/user/sign-up.use-case";
import { InputParseError } from "@/core/_domain/errors/common.error";
import { SignUpData, SignUpSchema } from "@/schema/user/sign-up.schema";

export type SignUpControllerType = ReturnType<typeof signUpController>;

export const signUpController =
  (signUpUseCase: SignUpUseCase, signUpSchema: SignUpSchema) =>
  async (input: SignUpData): Promise<void> => {
    const parsed = signUpSchema.safeParse(input);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Invalid Data";
      throw new InputParseError(firstError, {
        cause: parsed.error.format(),
      });
    }
    await signUpUseCase(parsed.data);
  };
