"use client";

import React, { startTransition, useActionState, useEffect } from "react";

import Link from "next/link";
import { getUserInitialCardsDataAction } from "./action";
import { IFetchCardWithInformationAndDesignData } from "@/core/_domain/repositories/types/card.types";
import InitialProfileCardComponent from "@/components/ProfileComponent/InitialProfileCard/InitialProfileCard";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

const page = () => {
  const initialData: {
    success: boolean;
    data: IFetchCardWithInformationAndDesignData[];
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
            (card: IFetchCardWithInformationAndDesignData) => (
              <div
                key={card.id}
                className="hover:scale-105 transform transition ease-in"
              >
                <Link href={`/profile/${card.id}`}>
                  <InitialProfileCardComponent profileData={card} />{" "}
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
