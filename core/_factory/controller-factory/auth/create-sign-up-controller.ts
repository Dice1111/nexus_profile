import { signUpUseCase } from "@/core/_application/use-cases/auth/sign-up.use-case";
import { UserRepository } from "@/core/_infrastructure/repositories/user.repository";
import { AuthenticationService } from "@/core/_infrastructure/services/authentication.service";
import { signUpController } from "@/core/_controllers/auth/sign-up.controller";
import { signUpSchema } from "@/schema/auth/sign-up.schema";

export default function createSignUpController() {
  const repository = new UserRepository();
  const authenticationService = new AuthenticationService();
  const usecase = signUpUseCase(repository, authenticationService);
  return signUpController(usecase, signUpSchema);
}
