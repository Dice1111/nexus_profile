import { InformationModel } from "../models/information.model";

export type FetchInformationData = Omit<
  InformationModel,
  "createdAt" | "updatedAt"
>;
