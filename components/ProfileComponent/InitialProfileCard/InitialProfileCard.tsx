import { PROFILE_LAYOUT } from "@/core/_domain/enum/design-repository.enum";
import { FetchDesignData } from "@/core/_domain/types/design-repository.types";
import { FetchInformationData } from "@/core/_domain/types/information-repository.types";
import dynamic from "next/dynamic";
import ProfileLayoutOne from "../ProfileHeaderLayout/ProfileLayoutOne";

interface InitialProfileCardComponentProps {
  information: FetchInformationData;
  design: FetchDesignData;
}

const InitialProfileCardComponent = ({
  information,
  design,
}: InitialProfileCardComponentProps) => {
  const DynamicProfileLayoutOne = dynamic(
    () => import("../ProfileHeaderLayout/ProfileLayoutOne")
  );

  const DynamicProfileLayoutTwo = dynamic(
    () => import("../ProfileHeaderLayout/ProfileLayoutTwo")
  );

  return (
    <div
      className="relative max-w-[400px] flex flex-col overflow-hidden rounded-lg shadow-lg"
      style={{
        backgroundColor: design.backgroundColor || "#000000",
        color: design.foregroundColor || "#ffffff",
      }}
    >
      {design.layout === PROFILE_LAYOUT.LAYOUT_ONE && (
        <DynamicProfileLayoutOne design={design} information={information} />
        // <ProfileLayoutOne design={design} information={information} />
      )}
      {design.layout === PROFILE_LAYOUT.LAYOUT_TWO && (
        <DynamicProfileLayoutTwo design={design} information={information} />
        // <ProfileLayoutTwo design={design} information={information} />
      )}
    </div>
  );
};

export default InitialProfileCardComponent;
