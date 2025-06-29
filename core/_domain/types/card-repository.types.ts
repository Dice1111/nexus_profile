import { CardModel } from "../models/card.model";
import { DesignModel } from "../models/design.model";
import { InformationModel } from "../models/information.model";

export type CardWithTitleAndID = Pick<CardModel, "id" | "title">;

export type CardWithInformationAndDesignData = Pick<
  CardModel,
  "id" | "title"
> & {
  Information: Omit<InformationModel, "createdAt" | "updatedAt"> | null;
  Design: Omit<DesignModel, "createdAt" | "updatedAt"> | null;
};
