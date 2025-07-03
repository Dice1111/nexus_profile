"use client";

import { useDesignState } from "@/state_management/design.state";
import { useProfileComponentsState } from "@/state_management/profile-component.state";
import ProfileHeaderLayout from "../ProfileHeaderLayout/ProfileHeaderLayout";

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
      className="relative w-[400px]  flex flex-col overflow-hidden rounded-lg "
      style={{
        backgroundColor: backgroundColor || "#000000",
        color: foregroundColor || "#ffffff",
      }}
    >
      {/* header area */}
      <ProfileHeaderLayout layout={layout} />

      {/* item area */}
    </div>
  );
};
export default ProfileCardComponent;
