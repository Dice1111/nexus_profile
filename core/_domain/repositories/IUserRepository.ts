import { UserModel } from "../models/user.model";
import { ICreateUserData } from "../types/user-repository.types";

export interface IUserRepository {
  findByEmail(email: string): Promise<UserModel | null>;
  create(data: ICreateUserData): Promise<void>;
}
