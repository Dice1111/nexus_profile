import { useProfileContext } from "@/context/profileContext";
import { svgWaveLayoutData } from "@/lib/profileCardLayoutData/SvgWaveLayoutData";
import Image from "next/image";

const ProfileLayoutOne = () => {
  const context = useProfileContext();
  if (!context) {
    console.warn("profileEditContext is null");
    return null;
  }

  const { profileData } = context;

  return (
    <div>
      <div className="w-full h-80 relative overflow-hidden">
        {/* Profile Picture */}
        <Image
          src={profileData.image}
          alt="Profile Picture"
          width={1000}
          height={1000}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-0 w-full ">
          {
            svgWaveLayoutData[
              profileData.wave_type as keyof typeof svgWaveLayoutData
            ]
          }
        </div>
      </div>

      {/* Profile Data */}
      <div className=" relative px-7 py-10">
        {/* Logo */}
        {/* absolute bg-red-500 -top-10 right-2 w-[80px] h-[80px] rounded-full overflow-hidden shadow-lg */}
        <div className="absolute bg-transparent -top-10 right-2 w-[80px] h-[80px] rounded-full overflow-hidden shadow-lg">
          <Image
            src={profileData.logo_icon}
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

        <p className="text-md text-gray-500 mt-2">{profileData.company}</p>
        <p className="text-sm text-gray-500">{profileData.quote}</p>

        <p className="text-sm text-end mt-2 font-thin italic text-gray-500">
          Goes by - {profileData.preferred_name} <br />
          {profileData.pronouns}
        </p>
        <p className="text-sm mt-1">{profileData.message}</p>
      </div>
    </div>
  );
};

export default ProfileLayoutOne;
