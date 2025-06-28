"use client";

import { FetchDesignData } from "@/core/_domain/types/design-repository.types";
import { FetchInformationData } from "@/core/_domain/types/information-repository.types";
import { profileLayoutData } from "@/lib/profileCardLayoutData/LayoutData";

interface InitialProfileCardComponentProps {
  design: FetchDesignData;
  information: FetchInformationData;
}

const InitialProfileCardComponent = ({
  design,
  information,
}: InitialProfileCardComponentProps) => {
  const layoutComponent = profileLayoutData(design, information)[
    design.layout as keyof typeof profileLayoutData
  ];

  return (
    <div
      className="relative max-w-[400px]  flex flex-col overflow-hidden rounded-lg bg-red-300 shadow-lg"
      style={{
        backgroundColor: design.backgroundColor || "#000000",
        color: design.foregroundColor || "#ffffff",
      }}
    >
      {/* header area */}
      {layoutComponent}
    </div>
  );
};
export default InitialProfileCardComponent;
