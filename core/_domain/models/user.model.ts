export interface UserModel {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}
