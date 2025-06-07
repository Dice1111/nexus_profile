import { createUser } from "@/src/infrastructure/user/user";
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
  if (!email.includes("@")) {
    throw new Error("Invalid email address.");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  await createUser({ name, email, passwordHash });
}
