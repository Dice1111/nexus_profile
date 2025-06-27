import { UserModel } from "../models/user.model";

type BaseUser = Omit<UserModel, "id" | "createdAt" | "updatedAt">;
export interface ICreateUserData extends BaseUser {}
