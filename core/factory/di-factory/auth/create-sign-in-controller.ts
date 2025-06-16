import { signInUseCase } from "@/core/application/use-cases/auth/sign-in.use-case";
import { UserRepository } from "@/core/infrastructure/models/user.repository";
import { AuthenticationService } from "@/core/infrastructure/services/authentication.service";
import { signInController } from "@/core/controllers/auth/sign-in.controller";
import { signInSchema } from "@/schema/auth/sign-in.schema";

export default function CreateSignInController() {
  const repository = new UserRepository();
  const authenticationService = new AuthenticationService();
  const usecase = signInUseCase(repository, authenticationService);
  return signInController(usecase, signInSchema);
}
