import { SignInUseCase } from "@/core/_application/use-cases/user/sign-in.use-case";
import { InputParseError } from "@/core/_domain/errors/common.error";
import { SignInData, SignInSchema } from "@/schema/user/sign-in.schema";

export type SignInControllerType = ReturnType<typeof signInController>;

export const signInController =
  (signInUseCase: SignInUseCase, signInSchema: SignInSchema) =>
  async (input: Partial<SignInData>): Promise<void> => {
    const parsed = signInSchema.safeParse(input);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Invalid input";
      throw new InputParseError(firstError, {
        cause: parsed.error.format(),
      });
    }
    await signInUseCase(parsed.data);
  };
