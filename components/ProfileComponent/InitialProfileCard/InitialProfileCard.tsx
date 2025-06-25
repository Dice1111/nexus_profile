"use client";

import { IFetchCardWithInformationAndDesignData } from "@/core/_domain/repositories/types/card.types";
import { profileLayoutData } from "@/lib/profileCardLayoutData/LayoutData";

interface InitialProfileCardComponentProps {
  profileData: IFetchCardWithInformationAndDesignData;
}

const InitialProfileCardComponent = ({
  profileData,
}: InitialProfileCardComponentProps) => {
  const layoutComponent =
    profileLayoutData(profileData)[
      profileData.Design?.layout as keyof typeof profileLayoutData
    ];

  return (
    <div
      className="relative max-w-[400px]  flex flex-col overflow-hidden rounded-lg bg-red-300 shadow-lg"
      style={{
        backgroundColor: profileData.Design?.backgroundColor || "#000000",
        color: profileData.Design?.foregroundColor || "#ffffff",
      }}
    >
      {/* header area */}
      {layoutComponent}
    </div>
  );
};
export default InitialProfileCardComponent;
