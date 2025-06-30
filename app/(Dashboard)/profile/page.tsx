import InitialProfileCardComponent from "@/components/ProfileComponent/InitialProfileCard/InitialProfileCard";
import { CardWithInformationAndDesignData } from "@/core/_domain/types/card-repository.types";
import Link from "next/link";
import { getUserInitialCardsDataAction } from "./action";

const page = async () => {
  const data = await getUserInitialCardsDataAction();

  return (
    <>
      <div className="flex gap-1 justify-center flex-wrap">
        {data.data.map((card: CardWithInformationAndDesignData) => (
          <div
            key={card.id}
            className="hover:scale-105 transform transition ease-in"
          >
            <Link href={`/profile/${card.id ?? "new"}`}>
              {card.Information && card.Design && (
                <InitialProfileCardComponent
                  information={card.Information}
                  design={card.Design}
                />
              )}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
