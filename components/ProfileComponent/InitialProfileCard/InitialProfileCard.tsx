import { CardWithInformationAndDesignData } from "@/core/_domain/types/card-repository.types";
import ProfileHeaderLayout from "../ProfileHeaderLayout/ProfileHeaderLayout";

interface InitialProfileCardComponentProps {
  card: CardWithInformationAndDesignData;
}

const InitialProfileCardComponent = ({
  card,
}: InitialProfileCardComponentProps) => {
  return (
    <>
      <h1 className="max-w-[70%] text-md italic mb-2">{card.title}</h1>

      <div
        className="relative w-[300px] h-[530px] flex flex-col overflow-hidden rounded-lg shadow-lg"
        style={{
          backgroundColor: card.Design.backgroundColor || "#000000",
          color: card.Design.foregroundColor || "#ffffff",
          boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.3)",
        }}
      >
        <ProfileHeaderLayout
          layout={card.Design.layout}
          design={card.Design}
          information={card.Information}
        />

        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-24"
          style={{
            background: `linear-gradient(to bottom, transparent, ${
              card.Design.backgroundColor || "#000000"
            })`,
          }}
        />
      </div>
      {/* Bottom fade effect */}
    </>
  );
};

export default InitialProfileCardComponent;
