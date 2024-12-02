"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { CONTACT_TAG_TYPE, ProfileCard, ProfileDndComponent } from "@/lib/type";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import TagAndNote from "./SubComponents/TagAndNote";
import {
  fetchUserProfileCardData,
  fetchUserProfileDndComponentsData,
} from "@/services/profile-data-service";

// Enum for Sheet Variants
export enum SHEET_VARIENT {
  CONNECTION = "CONNECTION",
  REQUEST = "REQUEST",
}

// Props for Connection and Request Sheet Variants
export interface ConnectionSheetVarient {
  cardId: string;
  fullname: string;
  tag: CONTACT_TAG_TYPE;
  note?: string;
  date: Date;
}

export interface RequestSheetVarient {
  cardId: string;
  fullname: string;
  date: Date;
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
  { ssr: false } // Client-side rendering only
);

const formatDisplayDate = (date: Date, sheetVarient: SHEET_VARIENT): string => {
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch profile and component data when cardId changes
  useEffect(() => {
    if (sheetData.cardId) {
      loadProfileData(sheetData.cardId);
    }
  }, [sheetData.cardId]);

  const loadProfileData = async (cardId: string) => {
    setIsLoading(true);
    try {
      const [profileData, componentsData] = await Promise.all([
        fetchUserProfileCardData(cardId),
        fetchUserProfileDndComponentsData(cardId),
      ]);
      setProfileCardData(profileData);
      setProfileDndComponents(componentsData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="max-w-md px-6 py-4 overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl font-semibold text-primary-foreground">
            {sheetData.fullname}
          </SheetTitle>
          <SheetDescription className="text-sm text-primary-foreground">
            {formatDisplayDate(sheetData.date, sheetVarient)}
          </SheetDescription>
        </SheetHeader>

        {sheetVarient === SHEET_VARIENT.CONNECTION && (
          <TagAndNote
            tag={(sheetData as ConnectionSheetVarient).tag}
            note={(sheetData as ConnectionSheetVarient).note}
            onSaveChanges={(updatedTag, updatedNotes) =>
              console.log("Saved changes:", updatedTag, updatedNotes)
            }
          />
        )}

        {profileCardData && profileDndComponents ? (
          isLoading ? (
            <div className="text-primary-foreground">Loading Profile...</div>
          ) : (
            <ProfileCardComponent
              profileData={profileCardData}
              components={profileDndComponents}
            />
          )
        ) : (
          <div className="text-muted-foreground text-center text-sm mt-5">
            No Card to show
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
