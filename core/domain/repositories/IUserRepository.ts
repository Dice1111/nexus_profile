import { CreateUserInputModel } from "../models/inputs/create-user-input.model";
import { UserModel } from "../models/tables/user.model";

export interface IUserRepository {
  findByEmail(email: string): Promise<UserModel | null>;
  create(data: CreateUserInputModel): Promise<void>;
}
