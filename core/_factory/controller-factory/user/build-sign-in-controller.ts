import { signInUseCase } from "@/core/_application/use-cases/user/sign-in.use-case";
import { UserRepository } from "@/core/_infrastructure/repositories/user.repository";
import { AuthenticationService } from "@/core/_infrastructure/services/authentication.service";
import { signInController } from "@/core/_controllers/user/sign-in.controller";
import { signInSchema } from "@/schema/user/sign-in.schema";

export default function buildSignInController() {
  const repository = new UserRepository();
  const authenticationService = new AuthenticationService();
  const usecase = signInUseCase(repository, authenticationService);
  return signInController(usecase, signInSchema);
}
