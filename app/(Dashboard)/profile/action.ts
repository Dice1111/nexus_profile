"use server"
export async function getUserInitialCardsDataAction(  _prevState: {
    success: boolean;
    userID: string;
  }) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      userID: "1",
    };
}

