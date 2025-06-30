import { FetchCardIdAndTitleByUserIdUseCase } from "@/core/_application/use-cases/card/fetch-card-id-and-title-by-user-id.use-case";
import { CardWithTitleAndID } from "@/core/_domain/types/card-repository.types";

export const fetchCardIdAndTitleByUserIdController =
  (fetchCardIdAndTitleByUserIdUseCase: FetchCardIdAndTitleByUserIdUseCase) =>
  async (): Promise<CardWithTitleAndID[]> => {
    const data = await fetchCardIdAndTitleByUserIdUseCase();
    return data;
  };
