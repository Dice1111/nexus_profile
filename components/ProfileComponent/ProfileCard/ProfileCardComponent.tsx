"use client";

import { useDesignState } from "@/state_management/design.state";
import { useProfileComponentsState } from "@/state_management/profile-component.state";
import ProfileHeaderLayout from "../ProfileHeaderLayout/ProfileHeaderLayout";
import ProfileBodyItem from "./ProfileBodyItem";

const ProfileCardComponent = () => {
  //STATE MANAGEMENT
  const backgroundColor = useDesignState((state) => state.backgroundColor);
  const foregroundColor = useDesignState((state) => state.foregroundColor);
  const layout = useDesignState((state) => state.layout);
  const profileComponents = useProfileComponentsState(
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
      <ProfileHeaderLayout layout={layout} />

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
