import { SignUpUseCaseType } from "@/core/_application/use-cases/auth/sign-up.use-case";
import { InputParseError } from "@/core/_domain/errors/common.error";
import {
  SignUpInputType,
  SignUpSchemaType,
} from "@/schema/auth/sign-up.schema";

export type SignUpControllerType = ReturnType<typeof signUpController>;

export const signUpController =
  (signUpUseCase: SignUpUseCaseType, signUpSchema: SignUpSchemaType) =>
  async (input: Partial<SignUpInputType>): Promise<void> => {
    const parsed = signUpSchema.safeParse(input);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Invalid input";
      throw new InputParseError(firstError, {
        cause: parsed.error.format(),
      });
    }
    await signUpUseCase(parsed.data);
  };
