import { PROFILE_LAYOUT } from "@/core/_domain/enum/design-repository.enum";
import React from "react";
import ProfileLayoutOne from "./ProfileLayoutOne";
import ProfileLayoutTwo from "./ProfileLayoutTwo";
// import ProfileLayoutThree from "./ProfileLayoutThree";

import { FetchDesignData } from "@/core/_domain/types/design-repository.types";
import { FetchInformationData } from "@/core/_domain/types/information-repository.types";

interface Props {
  layout: PROFILE_LAYOUT;
  design?: FetchDesignData;
  information?: FetchInformationData;
}

export const PROFILE_LAYOUTS = [
  PROFILE_LAYOUT.LAYOUT_ONE,
  PROFILE_LAYOUT.LAYOUT_TWO,
  PROFILE_LAYOUT.LAYOUT_THREE,
] as const;

// Component map
const layoutComponentMap: Record<
  PROFILE_LAYOUT,
  React.FC<{ design?: FetchDesignData; information?: FetchInformationData }>
> = {
  [PROFILE_LAYOUT.LAYOUT_ONE]: ProfileLayoutOne,
  [PROFILE_LAYOUT.LAYOUT_TWO]: ProfileLayoutTwo,
  [PROFILE_LAYOUT.LAYOUT_THREE]: ProfileLayoutOne,
};

const ProfileHeaderLayout = ({ layout, design, information }: Props) => {
  const SelectedLayout = layoutComponentMap[layout];

  if (!PROFILE_LAYOUTS.includes(layout)) {
    return <div>Unsupported layout</div>;
  }

  return <SelectedLayout design={design} information={information} />;
};

export default ProfileHeaderLayout;
