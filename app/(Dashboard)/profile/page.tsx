"use client";

import React, { startTransition, useActionState, useEffect } from "react";

import Link from "next/link";
import { getUserInitialCardsDataAction } from "./action";

const page = () => {
  const initialData = {
    success: false,
    userID: "",
  };

  const [userState, userInitialCardsDataAction, isPending] = useActionState(
    getUserInitialCardsDataAction,
    initialData
  );

  useEffect(() => {
    startTransition(() => userInitialCardsDataAction());
  }, []);

  return (
    <>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <Link
          href={`/profile/${userState.userID}`}
          className="bg-red-200"
        ></Link>
      )}
    </>
  );
};

export default page;
