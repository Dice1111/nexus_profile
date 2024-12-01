// ProfileCardSheet.tsx
"use client";

import { CONTACT_TAG_TYPE } from "@/lib/type";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import TagAndNote from "./SubComponents/TagAndNote";

export enum SHEET_VARIENT {
  CONNECTION,
  REQUEST,
}

export interface ConnectionSheetVarient {
  cardId: number;
  name: string;
  tag: CONTACT_TAG_TYPE;
  note?: string;
  date: Date;
}

export interface RequestSheetVarient {
  cardId: number;
  name: string;
  date: Date;
}

interface ProfileCardSheetProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sheetData: ConnectionSheetVarient | RequestSheetVarient;
  sheetVarient: SHEET_VARIENT;
}

const displayDateFormat = (date: Date, sheetVarient: SHEET_VARIENT) => {
  switch (sheetVarient) {
    case SHEET_VARIENT.CONNECTION:
      return `Connected on ${new Date(date).toLocaleDateString()}`;
    case SHEET_VARIENT.REQUEST:
      return `Requested on ${new Date(date).toLocaleDateString()}`;
  }
};

const handleSaveChanges = (updatedTag: string, updatedNotes: string) => {
  console.log("Saved changes:", updatedTag, updatedNotes);
};

export default function ProfileCardSheet({
  isOpen,
  setIsOpen,
  sheetData,
  sheetVarient,
}: ProfileCardSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="max-w-md px-6 py-4 overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl font-semibold text-primary-foreground">
            {sheetData.name}
          </SheetTitle>
          <SheetDescription className="text-sm text-primary-foreground">
            {displayDateFormat(sheetData.date, sheetVarient)}
          </SheetDescription>
        </SheetHeader>

        {sheetVarient === SHEET_VARIENT.CONNECTION && (
          <TagAndNote
            tag={(sheetData as ConnectionSheetVarient).tag}
            note={(sheetData as ConnectionSheetVarient).note}
            onSaveChanges={handleSaveChanges}
          />
        )}
        <div className="w-full h-[1000px] bg-blue-700">
          This is card component{" "}
        </div>
      </SheetContent>
    </Sheet>
  );
}
