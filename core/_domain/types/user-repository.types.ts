import { UserModel } from "../models/user.model";

export type CreateUserInput = Omit<UserModel, "id" | "createdAt" | "updatedAt">;

export type UserSettingResponse = Omit<
  UserModel,
  "id" | "passwordHash" | "createdAt" | "updatedAt"
>;

export type UpdateNameInput = Pick<UserModel, "id" | "name">;
