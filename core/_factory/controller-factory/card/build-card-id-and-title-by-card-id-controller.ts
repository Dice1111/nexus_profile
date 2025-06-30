import { fetchCardIdAndTitleByUserIdUseCase } from "@/core/_application/use-cases/card/fetch-card-id-and-title-by-user-id.use-case";
import { fetchCardIdAndTitleByUserIdController } from "@/core/_controllers/profile-card/fetch-card-id-and-title-by-user-id.controller";
import { CardRepository } from "@/core/_infrastructure/repositories/card.repository";
import { AuthenticationService } from "@/core/_infrastructure/services/authentication.service";

export function buildCardIdAndTitleByCardIdController() {
  const cardRepository = new CardRepository();
  const authenticationService = new AuthenticationService();
  const usecase = fetchCardIdAndTitleByUserIdUseCase(
    cardRepository,
    authenticationService
  );
  return fetchCardIdAndTitleByUserIdController(usecase);
}
