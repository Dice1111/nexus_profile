import { PROFILE_LAYOUT } from "@/core/_domain/enum/design-repository.enum";
import { FetchDesignData } from "@/core/_domain/types/design-repository.types";
import { FetchInformationData } from "@/core/_domain/types/information-repository.types";
import dynamic from "next/dynamic";
import ProfileLayoutOne from "../ProfileHeaderLayout/ProfileLayoutOne";
import ProfileLayoutTwo from "../ProfileHeaderLayout/ProfileLayoutTwo";
import ProfileHeaderLayout from "../ProfileHeaderLayout/ProfileHeaderLayout";

interface InitialProfileCardComponentProps {
  information: FetchInformationData;
  design: FetchDesignData;
}

const InitialProfileCardComponent = ({
  information,
  design,
}: InitialProfileCardComponentProps) => {
  return (
    <div
      className="relative max-w-[400px] flex flex-col overflow-hidden rounded-lg shadow-lg"
      style={{
        backgroundColor: design.backgroundColor || "#000000",
        color: design.foregroundColor || "#ffffff",
      }}
    >
      <ProfileHeaderLayout
        layout={design.layout}
        design={design}
        information={information}
      />
    </div>
  );
};

export default InitialProfileCardComponent;
