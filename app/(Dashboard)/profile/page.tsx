import InitialProfileCardComponent from "@/components/ProfileComponent/InitialProfileCard/InitialProfileCard";
import { CardWithInformationAndDesignData } from "@/core/_domain/types/card-repository.types";
import Link from "next/link";
import { getUserInitialCardsDataAction } from "./action";
import { Button } from "@/components/ui/button";
import { MdOutlineAddCard } from "react-icons/md";
import CardSkeleton from "@/components/Skeleton/CardSkeleton";

const page = async () => {
  const data = await getUserInitialCardsDataAction();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Profile Cards</h2>

      <div className="w-full flex justify-center">
        <Button variant={"outline"}>
          <MdOutlineAddCard />
          Create New Card
        </Button>
      </div>

      <div className="flex  justify-center  gap-10 flex-wrap transform">
        {data.data.map((card: CardWithInformationAndDesignData) => (
          <div
            key={card.id}
            className=" transform hover:scale-105  transition ease-in-out duration-500 "
          >
            <Link href={`/profile/${card.id ?? "new"}`}>
              {card.Information && card.Design && (
                <InitialProfileCardComponent card={card} />
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
