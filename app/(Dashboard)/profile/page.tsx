"use client";

import React, { startTransition, useActionState, useEffect } from "react";

import Link from "next/link";
import { getUserInitialCardsDataAction } from "./action";
import { CardWithInformationAndDesignData } from "@/core/_domain/types/card-repository.types";
import InitialProfileCardComponent from "@/components/ProfileComponent/InitialProfileCard/InitialProfileCard";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

const page = () => {
  const initialData: {
    success: boolean;
    data: CardWithInformationAndDesignData[];
  } = {
    success: false,
    data: [],
  };

  const [initialCardsState, userInitialCardsDataAction, isPending] =
    useActionState(getUserInitialCardsDataAction, initialData);

  useEffect(() => {
    startTransition(() => userInitialCardsDataAction());
  }, []);

  useEffect(() => {
    console.log("userState", initialCardsState.data);
  }, [initialCardsState]);

  return (
    <>
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <div className="flex gap-1 justify-center flex-wrap">
          {initialCardsState.data.map(
            (card: CardWithInformationAndDesignData) => (
              <div
                key={card.id}
                className="hover:scale-105 transform transition ease-in"
              >
                <Link href={`/profile/${card.id ?? "new"}`}>
                  {card.Information && card.Design && (
                    <InitialProfileCardComponent
                      design={card.Design}
                      information={card.Information}
                    />
                  )}
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default page;
