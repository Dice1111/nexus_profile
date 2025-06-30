"use client";
import { FetchDesignData } from "@/core/_domain/types/design-repository.types";
import { FetchInformationData } from "@/core/_domain/types/information-repository.types";
// import { svgWaveLayoutData } from "@/lib/profileCardLayoutData/SvgWaveLayoutData";
import { useDesignState } from "@/state_management/design.state";
import { useInformationState } from "@/state_management/information.state";

import Image from "next/image";
import { useEffect } from "react";

interface ProfileLayoutTwoProps {
  design?: FetchDesignData;
  information?: FetchInformationData;
}

const ProfileLayoutTwo = ({ design, information }: ProfileLayoutTwoProps) => {
  const default_profile = "/image/default-profile.jpg";
  // Design state
  const profileImage =
    design?.profileImage || useDesignState((state) => state.profileImage);
  const logoImage =
    design?.logoImage || useDesignState((state) => state.logoImage);

  // Information state
  const prefix =
    information?.prefix || useInformationState((state) => state.prefix);
  const fullName =
    information?.fullName || useInformationState((state) => state.fullName);
  const suffix =
    information?.suffix || useInformationState((state) => state.suffix);
  const title =
    information?.title || useInformationState((state) => state.title);
  const occupation =
    information?.occupation || useInformationState((state) => state.occupation);
  const company =
    information?.company || useInformationState((state) => state.company);
  const message =
    information?.message || useInformationState((state) => state.message);
  const quote =
    information?.quote || useInformationState((state) => state.quote);
  const preferredName =
    information?.preferredName ||
    useInformationState((state) => state.preferredName);
  const pronouns =
    information?.pronouns || useInformationState((state) => state.pronouns);

  useEffect(() => {
    console.log("Profile Layout two");
    console.log(
      profileImage,
      logoImage,
      title,
      occupation,
      company,
      message,
      quote,
      preferredName,
      pronouns
    );
  }, [
    profileImage,
    logoImage,
    title,
    occupation,
    company,
    message,
    quote,
    preferredName,
    pronouns,
  ]);

  return (
    <div>
      <div className="w-full h-40 relative overflow-hidden">
        {/* Profile Picture */}
        <Image
          src={profileImage || default_profile}
          alt="Profile Picture"
          width={1000}
          height={1000}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* <div className="absolute -bottom-10 w-full ">
          {
            svgWaveLayoutData(design.wave_color)[
              design.wave_type as keyof typeof svgWaveLayoutData
            ]
          }
        </div> */}
      </div>

      {/* Profile Data */}
      <div className=" relative px-7 py-10">
        {/* Logo */}
        {/* absoluopacity-80 -top-10 right-2 w-[80px] h-[80px] rounded-full overflow-hidden shadow-lg */}
        <div className="absolute  -top-10 right-1/2 translate-x-1/2 w-[80px] h-[80px] rounded-full overflow-hidden shadow-lg">
          <Image
            src={logoImage || default_profile}
            alt="Logo Icon"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-semibold">
          {prefix} {fullName}
          {suffix}
        </h2>
        <p className="text-xl font-thin mt-2">{title}</p>
        <p className="text-xl font-thin">{occupation}</p>

        <p className="text-md opacity-80 mt-2">{company}</p>
        <p className="text-sm opacity-80">{quote}</p>

        <p className="text-sm text-end mt-2 font-thin italic opacity-80">
          Goes by - {preferredName} <br />
          {pronouns}
        </p>
        <p className="text-sm mt-1">{message}</p>
      </div>
    </div>
  );
};

export default ProfileLayoutTwo;
