"use client";

import NavBar from "@/components/NavBar/NavBar";
import { PROFILE_PANEL } from "@/lib/navbar/enum";
import { NavBarNavigation } from "@/lib/navbar/type";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import dynamic from "next/dynamic";

const navItems: NavBarNavigation<PROFILE_PANEL>[] = [
  { label: "Display", panel: PROFILE_PANEL.DESIGN },
  { label: "Fields", panel: PROFILE_PANEL.FIELDS },
  { label: "Information", panel: PROFILE_PANEL.INFORMATION },
  { label: "Preview", panel: PROFILE_PANEL.PREVIEW },
];

const DesignEditModal = dynamic(() => import("./DesignEditModal"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const InformationEditModal = dynamic(() => import("./InformationEditModal"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
const FieldsEditModal = dynamic(() => import("./FieldsEditModal"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const CardPreviewPage = dynamic(() => import("./CardPreviewPage"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function ProfileEditor() {
  return (
    <div
      className=" sm:max-w-[500px] w-full border-t-2 sm:border-t-0  sm:sticky sm:top-12 bg-background  sm:shadow-2xl  sm:overflow-auto px-4 flex flex-col gap-3"
      style={{ height: `calc(100vh - 48px)` }}
    >
      <NavBar wrapperClassName="top-0" data={navItems}>
        <div id={PROFILE_PANEL.DESIGN}>
          <DesignEditModal />
        </div>
        <div id={PROFILE_PANEL.INFORMATION}>
          <InformationEditModal />
        </div>
        <div id={PROFILE_PANEL.FIELDS}>
          <FieldsEditModal />
        </div>
        <div id={PROFILE_PANEL.PREVIEW} className="flex justify-center">
          <CardPreviewPage />
        </div>
      </NavBar>
    </div>
  );
}
