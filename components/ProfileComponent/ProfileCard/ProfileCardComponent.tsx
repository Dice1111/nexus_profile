"use client";

import { IFetchDesignData } from "@/core/_domain/types/design-repository.types";
import { IFetchInformationData } from "@/core/_domain/types/information-repository.types";
import { IFetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";
import { profileLayoutData } from "@/lib/profileCardLayoutData/LayoutData";
import ProfileBodyItem from "./ProfileBodyItem";

interface ProfileCardComponentProps {
  components: IFetchProfileComponentData[];
  design: IFetchDesignData;
  information: IFetchInformationData;
}

const ProfileCardComponent = ({
  components,
  design,
  information,
}: ProfileCardComponentProps) => {
  const layoutComponent = profileLayoutData(design, information)[
    design?.layout as keyof typeof profileLayoutData
  ];

  return (
    <div
      className="relative max-w-[400px]  flex flex-col overflow-hidden rounded-lg bg-red-300 "
      style={{
        backgroundColor: design.backgroundColor || "#000000",
        color: design.foregroundColor || "#ffffff",
      }}
    >
      {/* header area */}
      {layoutComponent}

      {/* item area */}
      <div className="flex flex-col gap-3 pb-4 w-full">
        {components.map((item) => (
          <ProfileBodyItem
            key={item.id}
            item={item}
            background_color={design.backgroundColor || "#000000"}
            foreground_color={design.foregroundColor || "#ffffff"}
          />
        ))}
      </div>
    </div>
  );
};
export default ProfileCardComponent;
