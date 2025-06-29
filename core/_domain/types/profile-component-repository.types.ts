import { ProfileComponentModel } from "../models/profile-component.model";

export type FetchProfileComponentData = Omit<
  ProfileComponentModel,
  "createdAt" | "updatedAt"
>;
