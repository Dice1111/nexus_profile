import { findUserByEmail } from "@/src/infrastructure/user/user";
import bcrypt from "bcrypt";

interface authenticateUserUseCaseProps {
  email: string;
  password: string;
}

interface verifyPasswordUseCaseProps {
  passwordHash: string;
  password: string;
}

export async function authenticateUserUseCase({
  email,
  password,
}: authenticateUserUseCaseProps): Promise<void> {
  if (!email.includes("@")) {
    throw new Error("Invalid email address.");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const user = await findUserByEmail({ email });

  if (!user) {
    throw new Error("Invalid Email");
  }

  const isValidPassword = await verifyPasswordUseCase({
    password,
    passwordHash: user.passwordHash,
  });

  if (!isValidPassword) {
    throw new Error("Invalid Password.");
  }
}

async function verifyPasswordUseCase({
  passwordHash,
  password,
}: verifyPasswordUseCaseProps): Promise<boolean> {
  return await bcrypt.compare(password, passwordHash);
}
