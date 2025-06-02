"use client";

import {
  fetchUserProfileCardData,
  fetchUserProfileDndComponentsData,
} from "@/services/profile-data-service";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import TagAndNote from "./SubComponents/TagAndNote";

import { ProfileCard, ProfileDndComponent } from "@/types/types";
import QRButton from "../QRCodeButton/QRButton";
import { CONTACT_TAG_TYPE } from "@prisma/client";

// Enum for Sheet Variants
export enum SHEET_VARIENT {
  CONNECTION = "CONNECTION",
  REQUEST = "REQUEST",
}

// Props for Connection and Request Sheet Variants
export interface ConnectionSheetVarient {
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  cardId: string;
  tag: CONTACT_TAG_TYPE;
  note: string | null;
  date: string;
}

export interface RequestSheetVarient {
  cardId: string;
  date: string;
}

interface ProfileCardSheetProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sheetData: ConnectionSheetVarient | RequestSheetVarient;
  sheetVarient: SHEET_VARIENT;
}

// Dynamic import of ProfileCardComponent
const ProfileCardComponent = dynamic(
  () => import("../ProfileComponent/ProfileCard/ProfileCardComponent"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

const formatDisplayDate = (
  date: string,
  sheetVarient: SHEET_VARIENT
): string => {
  const formattedDate = new Date(date).toLocaleDateString();
  return sheetVarient === SHEET_VARIENT.CONNECTION
    ? `Connected on ${formattedDate}`
    : `Requested on ${formattedDate}`;
};

// Main Component
export default function ProfileCardSheet({
  isOpen,
  setIsOpen,
  sheetData,
  sheetVarient,
}: ProfileCardSheetProps) {
  const [profileCardData, setProfileCardData] = useState<ProfileCard | null>(
    null
  );
  const [profileDndComponents, setProfileDndComponents] = useState<
    ProfileDndComponent[]
  >([]);

  // Fetch profile and component data when cardId changes
  useEffect(() => {
    if (sheetData.cardId) {
      loadProfileData(sheetData.cardId);
    }
  }, [sheetData.cardId]);

  const loadProfileData = async (cardId: string) => {
    try {
      const [profileData, componentsData] = await Promise.all([
        fetchUserProfileCardData(cardId),
        fetchUserProfileDndComponentsData(cardId),
      ]);
      setProfileCardData(profileData);
      setProfileDndComponents(componentsData);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  const fullname = [
    (sheetData as ConnectionSheetVarient).firstName,
    (sheetData as ConnectionSheetVarient).middleName,
    (sheetData as ConnectionSheetVarient).lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className=" min-w-[360px]  overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-primary-foreground">
            {fullname}
          </SheetTitle>
          <SheetDescription className="text-sm text-primary-foreground">
            {formatDisplayDate(sheetData.date, sheetVarient)}
          </SheetDescription>

          <div className="mt-4">
            {sheetVarient === SHEET_VARIENT.CONNECTION && (
              <TagAndNote
                tag={(sheetData as ConnectionSheetVarient).tag}
                note={(sheetData as ConnectionSheetVarient).note}
                onSaveChanges={(updatedTag, updatedNotes) =>
                  console.log("Saved changes:", updatedTag, updatedNotes)
                }
              />
            )}
          </div>
        </SheetHeader>

        <div className=" relative">
          {profileCardData && profileDndComponents ? (
            <>
              <ProfileCardComponent
                profileData={profileCardData}
                components={profileDndComponents}
              />
              <div className="absolute top-3 left-3 z-20">
                <QRButton profileID={sheetData.cardId} />
              </div>
            </>
          ) : (
            <div className="text-muted-foreground text-center text-sm mt-5">
              No Card to show
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
