import { profileLayoutData } from "@/lib/profileCardLayoutData/LayoutData";
import { ProfileCard, ProfileDndComponent } from "@/lib/type";
import ProfileBodyItem from "./ProfileBodyItem";

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
    <div className="  relative  max-w-[400px] flex flex-col bg-[#050505] text-primary-foreground overflow-hidden rounded-lg">
      {/* header area */}
      {layoutComponent}

      {/* item area */}

      <div className="flex flex-col gap-3 pb-4  w-full">
        {components.map((item) => (
          <ProfileBodyItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
export default ProfileCardComponent;
