"use server";

interface State {
  success: boolean;
  message: string;
}
interface Input {
  requestId: number;
  cardId: string;
  senderCardId: string;
}

export default async function saveToContactAction(
  _prevState: State,
  data: Input
): Promise<State> {
  return {
    success: true,
    message: `Request ${data.requestId} saved to contact`,
  };
}
