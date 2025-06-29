import { signUpUseCase } from "@/core/_application/use-cases/user/sign-up.use-case";
import { UserRepository } from "@/core/_infrastructure/repositories/user.repository";
import { AuthenticationService } from "@/core/_infrastructure/services/authentication.service";
import { signUpController } from "@/core/_controllers/user/sign-up.controller";
import { signUpSchema } from "@/schema/user/sign-up.schema";

export default function buildSignUpController() {
  const repository = new UserRepository();
  const authenticationService = new AuthenticationService();
  const usecase = signUpUseCase(repository, authenticationService);
  return signUpController(usecase, signUpSchema);
}
