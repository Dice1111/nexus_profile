import { UserModel } from "../tables/user.model";

type BaseUser = Omit<UserModel, "id" | "createdAt" | "updatedAt">;

export interface CreateUserInputModel extends BaseUser {}
