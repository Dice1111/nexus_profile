"use client";

import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useProfileContext } from "@/context/profileContext";
import dynamic from "next/dynamic";

const ProfileCardComponent = dynamic(
  () => import("../ProfileCard/ProfileCardComponent"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export default function CardPreviewPage() {
  const context = useProfileContext();

  if (!context) {
    console.warn("profileEditContext is null");
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl mb-10 font-thin">Preview</h1>
      <ProfileCardComponent />
    </div>
  );
}
