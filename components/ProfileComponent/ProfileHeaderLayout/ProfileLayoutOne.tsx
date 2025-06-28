// import { svgWaveLayoutData } from "@/lib/profileCardLayoutData/SvgWaveLayoutData";
import { FetchDesignData } from "@/core/_domain/types/design-repository.types";
import { FetchInformationData } from "@/core/_domain/types/information-repository.types";
import Image from "next/image";

interface ProfileLayoutOneProps {
  design: FetchDesignData;
  information: FetchInformationData;
}

const ProfileLayoutOne = ({ design, information }: ProfileLayoutOneProps) => {
  const default_profile = "/image/default-profile.jpg";

  return (
    <div>
      <div className="w-full h-80 relative overflow-hidden">
        {/* Profile Picture */}
        <Image
          src={design.profileImage || default_profile}
          alt="Profile Picture"
          width={1000}
          height={1000}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* <div className="absolute bottom-0 w-full ">
          {
            svgWaveLayoutData(profileData.wave_color)[
              profileData.wave_type as keyof typeof svgWaveLayoutData
            ]
          }
        </div> */}
      </div>

      {/* Profile Data */}
      <div className=" relative px-7 py-10">
        {/* Logo */}

        <div className="absolute bg-transparent -top-10 right-2 w-[80px] h-[80px] rounded-full overflow-hidden shadow-lg">
          <Image
            src={design.logoImage || default_profile}
            alt="Logo Icon"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-2xl font-semibold">
          {information.prefix}
          {information.fullName} {information.suffix}
        </h2>
        <p className="text-xl font-thin mt-2">{information.title}</p>
        <p className="text-xl font-thin">{information.occupation}</p>

        <p className="text-md mt-2 opacity-80">{information.company}</p>
        <p className="text-sm  opacity-80">{information.quote}</p>

        <p className="text-sm text-end mt-2 font-thin italic  opacity-80">
          Goes by - {information.preferredName} <br />
          {information.pronouns}
        </p>
        <p className="text-sm mt-1">{information.message}</p>
      </div>
    </div>
  );
};

export default ProfileLayoutOne;
