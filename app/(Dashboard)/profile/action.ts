"use server"
export async function getCardIdAction(  _prevState: {
    success: boolean;
    data: string;
  }) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      success: true,
      data: "1",
    };
}
