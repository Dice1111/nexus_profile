import { prisma } from "@/core/infrastructure/prisma/prisma-client";

interface createContactWithRequestUseCaseProps {
  requestId: number;
  cardId: string;
  senderCardId: string;
}

export default async function createContactWithRequestUseCase({
  requestId,
  cardId,
  senderCardId,
}: createContactWithRequestUseCaseProps) {}
