"use client";

import { IFetchCardWithInformationAndDesignData } from "@/core/_domain/repositories/types/card.types";
import { profileLayoutData } from "@/lib/profileCardLayoutData/LayoutData";
import { ProfileDndComponent } from "@/lib/types/types";
import ProfileBodyItem from "./ProfileBodyItem";

interface ProfileCardComponentProps {
  components: ProfileDndComponent[];
  profileData: IFetchCardWithInformationAndDesignData;
}

const ProfileCardComponent = ({
  components,
  profileData,
}: ProfileCardComponentProps) => {
  const layoutComponent =
    profileLayoutData(profileData)[
      profileData.Design?.layout as keyof typeof profileLayoutData
    ];

  return (
    <div
      className="relative max-w-[400px]  flex flex-col overflow-hidden rounded-lg bg-red-300 "
      style={{
        backgroundColor: profileData.Design?.backgroundColor || "#000000",
        color: profileData.Design?.foregroundColor || "#ffffff",
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
            background_color={profileData.Design?.backgroundColor || "#000000"}
            foreground_color={profileData.Design?.foregroundColor || "#ffffff"}
          />
        ))}
      </div>
    </div>
  );
};
export default ProfileCardComponent;
