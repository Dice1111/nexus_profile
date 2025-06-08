import { createUser } from "@/core/infrastructure/models/user";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;
interface signUpUseCaseProps {
  name: string;
  email: string;
  password: string;
}

export async function createUserUseCase({
  name,
  email,
  password,
}: signUpUseCaseProps): Promise<void> {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  await createUser({ name, email, passwordHash });
}
