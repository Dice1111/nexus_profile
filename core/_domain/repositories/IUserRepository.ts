import {
  CreateUserInput,
  UpdateNameInput,
  UserSettingResponse,
} from "../types/user-repository.types";

export interface IUserRepository {
  findPasswordHashByEmail(email: string): Promise<string>;
  create(data: CreateUserInput): Promise<void>;
  fetchUserSettingDataById(id: string): Promise<UserSettingResponse>;
  updateUserName(data: UpdateNameInput): Promise<void>;
}
