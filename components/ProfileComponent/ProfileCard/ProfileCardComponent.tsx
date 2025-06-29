"use client";

import { useDesign } from "@/state_management/design.state";
import { useProfileComponents } from "@/state_management/profile-component.state";
import ProfileBodyItem from "./ProfileBodyItem";
import { PROFILE_LAYOUT } from "@/core/_domain/enum/design-repository.enum";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import ProfileLayoutOne from "../ProfileHeaderLayout/ProfileLayoutOne";
import ProfileLayoutTwo from "../ProfileHeaderLayout/ProfileLayoutTwo";

const ProfileCardComponent = () => {
  // const DynamicProfileLayoutOne = dynamic(
  //   () => import("../ProfileHeaderLayout/ProfileLayoutOne"),
  //   {
  //     ssr: false,
  //   }
  // );

  // const DynamicProfileLayoutTwo = dynamic(
  //   () => import("../ProfileHeaderLayout/ProfileLayoutTwo"),
  //   {
  //     ssr: false,
  //   }
  // );

  //STATE MANAGEMENT
  const backgroundColor = useDesign((state) => state.backgroundColor);
  const foregroundColor = useDesign((state) => state.foregroundColor);
  const layout = useDesign((state) => state.layout);
  const profileComponents = useProfileComponents(
    (state) => state.profileComponents
  );

  return (
    <div
      className="relative max-w-[400px]  flex flex-col overflow-hidden rounded-lg bg-red-300 "
      style={{
        backgroundColor: backgroundColor || "#000000",
        color: foregroundColor || "#ffffff",
      }}
    >
      {/* header area */}
      {layout === PROFILE_LAYOUT.LAYOUT_ONE && (
        // <DynamicProfileLayoutOne />
        <ProfileLayoutOne />
      )}
      {layout === PROFILE_LAYOUT.LAYOUT_TWO && (
        // <DynamicProfileLayoutTwo />
        <ProfileLayoutTwo />
      )}

      {/* item area */}
      <div className="flex flex-col gap-3 pb-4 w-full">
        {profileComponents.map((item) => (
          <ProfileBodyItem
            key={item.id}
            item={item}
            background_color={backgroundColor || "#000000"}
            foreground_color={foregroundColor || "#ffffff"}
          />
        ))}
      </div>
    </div>
  );
};
export default ProfileCardComponent;
