import { SignInUseCaseType } from "@/core/application/use-cases/auth/sign-in.use-case";
import { InputParseError } from "@/core/domain/errors/common.error";
import {
  SignInInputType,
  SignInSchemaType,
} from "@/schema/auth/sign-in.schema";

export type SignInControllerType = ReturnType<typeof signInController>;

export const signInController =
  (signInUseCase: SignInUseCaseType, signInSchema: SignInSchemaType) =>
  async (input: Partial<SignInInputType>): Promise<void> => {
    const parsed = signInSchema.safeParse(input);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Invalid input";
      throw new InputParseError(firstError, {
        cause: parsed.error.format(),
      });
    }
    await signInUseCase(parsed.data);
  };
