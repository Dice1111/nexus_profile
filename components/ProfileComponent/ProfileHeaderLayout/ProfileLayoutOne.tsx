import { svgWaveLayoutData } from "@/lib/profileCardLayoutData/SvgWaveLayoutData";
import { ProfileCard } from "@/lib/type";
import Image from "next/image";

interface ProfileLayoutOneProps {
  profileData: ProfileCard;
}

const ProfileLayoutOne = ({ profileData }: ProfileLayoutOneProps) => {
  const default_profile = "/image/default-profile.jpg";

  return (
    <div>
      <div className="w-full h-80 relative overflow-hidden">
        {/* Profile Picture */}
        <Image
          src={profileData.image || default_profile}
          alt="Profile Picture"
          width={1000}
          height={1000}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-0 w-full ">
          {
            svgWaveLayoutData(profileData.wave_color)[
              profileData.wave_type as keyof typeof svgWaveLayoutData
            ]
          }
        </div>
      </div>

      {/* Profile Data */}
      <div className=" relative px-7 py-10">
        {/* Logo */}

        <div className="absolute bg-transparent -top-10 right-2 w-[80px] h-[80px] rounded-full overflow-hidden shadow-lg">
          <Image
            src={profileData.logo_icon || default_profile}
            alt="Logo Icon"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-2xl font-semibold">
          {profileData.prefix} {profileData.first_name}{" "}
          {profileData.middle_name} {profileData.last_name} {profileData.suffix}
        </h2>
        <p className="text-xl font-thin mt-2">{profileData.title}</p>
        <p className="text-xl font-thin">{profileData.occupation}</p>

        <p className="text-md mt-2 opacity-80">{profileData.company}</p>
        <p className="text-sm  opacity-80">{profileData.quote}</p>

        <p className="text-sm text-end mt-2 font-thin italic  opacity-80">
          Goes by - {profileData.preferred_name} <br />
          {profileData.pronouns}
        </p>
        <p className="text-sm mt-1">{profileData.message}</p>
      </div>
    </div>
  );
};

export default ProfileLayoutOne;
