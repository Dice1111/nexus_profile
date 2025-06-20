"use client";

import React, { startTransition, useActionState, useEffect } from "react";

import Link from "next/link";
import { getCardIdAction } from "./action";

const page = () => {
  const initial = {
    success: false,
    data: "",
  };

  const [userState, cardIdAction, isPending] = useActionState(
    getCardIdAction,
    initial
  );
  useEffect(() => {
    startTransition(() => cardIdAction());
  }, []);

  return (
    <>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <Link href={`/profile/${userState.data}`} className="bg-red-200">
          Profile
        </Link>
      )}
    </>
  );
};

export default page;
