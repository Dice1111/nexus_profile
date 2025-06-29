import { DesignModel } from "../models/design.model";

export type FetchDesignData = Omit<DesignModel, "createdAt" | "updatedAt">;
