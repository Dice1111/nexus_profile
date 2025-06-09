import { signUpUseCase } from "@/core/application/use-cases/auth/sign-up.use-case";
import { UserRepository } from "@/core/infrastructure/models/user.repository";
import { AuthenticationService } from "@/core/infrastructure/services/authentication.service";
import { signUpController } from "@/core/interface-adapters/controllers/auth/sign-up.controller";
import { signUpSchema } from "@/schema/auth/sign-up.schema";

export default function CreateSignUpController() {
  const repository = new UserRepository();
  const authenticationService = new AuthenticationService();
  const usecase = signUpUseCase(repository, authenticationService);
  return signUpController(usecase, signUpSchema);
}
