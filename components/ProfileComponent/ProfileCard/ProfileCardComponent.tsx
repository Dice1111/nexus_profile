import { profileLayoutData } from "@/lib/profileCardLayoutData/LayoutData";

import ProfileBodyItem from "./ProfileBodyItem";
import { ProfileDndComponent, ProfileCard } from "@/types/types";

interface ProfileCardComponentProps {
  components: ProfileDndComponent[];
  profileData: ProfileCard;
}

const ProfileCardComponent = ({
  components,
  profileData,
}: ProfileCardComponentProps) => {
  const layoutComponent =
    profileLayoutData(profileData)[
      profileData.layout as keyof typeof profileLayoutData
    ];

  return (
    <div
      className="relative max-w-[400px]  flex flex-col overflow-hidden rounded-lg bg-red-300 "
      style={{
        backgroundColor: profileData.background_color,
        color: profileData.foreground_color,
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
            background_color={profileData.background_color}
            foreground_color={profileData.foreground_color}
          />
        ))}
      </div>
    </div>
  );
};
export default ProfileCardComponent;
