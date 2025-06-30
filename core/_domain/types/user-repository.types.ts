import { UserModel } from "../models/user.model";

export type CreateUserInput = Pick<
  UserModel,
  "email" | "name" | "passwordHash"
>;

export type UserSettingResponse = Omit<
  UserModel,
  "id" | "passwordHash" | "createdAt" | "updatedAt"
>;

export type UpdateNameInput = Pick<UserModel, "id" | "name">;
