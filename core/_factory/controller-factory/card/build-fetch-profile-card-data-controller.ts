import { fetchDesignWithCardIdUseCase } from "@/core/_application/use-cases/card/fetch-design-with-card-id.usecase";
import { fetchInformationWithCardIdUseCase } from "@/core/_application/use-cases/card/fetch-information-with-card-id.usecase";
import { fetchProfileComponentsWithCardIdUseCase } from "@/core/_application/use-cases/card/fetch-profile-components-with-card-id.usecase";
import { fetchProfileCardDataController } from "@/core/_controllers/profile-card/fetch-profile-card-data.controller";
import { DesignRepository } from "@/core/_infrastructure/repositories/design.repository";
import { InformationRepository } from "@/core/_infrastructure/repositories/information.repository";
import { ProfileComponentRepository } from "@/core/_infrastructure/repositories/profile-component.repository";

export function buildFetchProfileCardDataController() {
  const informationRepository = new InformationRepository();
  const designRepository = new DesignRepository();
  const profileComponentRepository = new ProfileComponentRepository();

  const fetchInformationWithCardId = fetchInformationWithCardIdUseCase(
    informationRepository
  );
  const fetchDesignWithCardId = fetchDesignWithCardIdUseCase(designRepository);
  const fetchProfileComponentsWithCard =
    fetchProfileComponentsWithCardIdUseCase(profileComponentRepository);

  const fetchProfileCardData = fetchProfileCardDataController(
    fetchInformationWithCardId,
    fetchDesignWithCardId,
    fetchProfileComponentsWithCard
  );
  return fetchProfileCardData;
}
