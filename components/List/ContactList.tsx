"use client";

import { IContactWithSpecificCardData } from "@/core/_domain/repositories/types/contact.types";
import React, {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useState,
} from "react";
import ContactRow from "../Row/ContactRow";
import ProfileCardSheet, {
  ConnectionSheetVarient,
  SHEET_VARIENT,
} from "../Sheet/ProfileCardSheet";
import {
  deleteContactAction,
  IDeleteContactActionState,
} from "@/app/(Dashboard)/contact/connection/action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { displayErrorToast } from "../Box/errorToastBox";
import { displaySuccessToast } from "../Box/successToastBox";

interface ContactListProps {
  contacts: IContactWithSpecificCardData[];
}

const MemoizedContactRow = React.memo(ContactRow);

const deleteContactActionInitialState: IDeleteContactActionState = {
  success: false,
  message: "",
};

export default function ContactList({ contacts }: ContactListProps) {
  const [SheetData, setSheetData] = useState<ConnectionSheetVarient | null>(
    null
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentContactId, setCurrentContactId] = useState<number | null>(null);
  const [isDeleteActionTriggered, setIsDeleteActionTriggered] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [deleteState, deleteAction, isPendingDelete] = useActionState(
    deleteContactAction,
    deleteContactActionInitialState
  );

  useEffect(() => {
    if (isDeleteActionTriggered && !isPendingDelete) {
      if (deleteState.success) {
        displaySuccessToast({ message: deleteState.message });
      } else if (!deleteState.success) {
        displayErrorToast({ message: deleteState.message });
      }
      setIsDeleteActionTriggered(false);
    }
  }, [isDeleteActionTriggered, deleteState, isPendingDelete]);

  useEffect(() => {
    if (!isPendingDelete) {
      setCurrentContactId(null);
      setIsDeleteDialogOpen(false);
    }
  }, [isPendingDelete]);

  const handleRowClick = useCallback(
    (rowData: IContactWithSpecificCardData) => {
      const sheetData: ConnectionSheetVarient = {
        contactId: rowData.id,
        fullName: rowData.fullName,
        cardId: rowData.contactCardId,
        tag: rowData.tag,
        note: rowData.note,
        date: rowData.updatedAt,
      };
      setSheetData(sheetData);
      setIsSheetOpen(true);
    },
    []
  );

  const handleRemove = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement>,
      contact: IContactWithSpecificCardData
    ) => {
      e.stopPropagation();
      setCurrentContactId(contact.id);
      setIsDeleteDialogOpen(true);
    },
    []
  );

  const handleConfirmRemove = () => {
    if (currentContactId) {
      startTransition(() => {
        deleteAction(currentContactId);
        setIsDeleteActionTriggered(true);
      });
    }
  };

  return (
    <div>
      <div className="bg-secondary text-secondary-foreground rounded-lg flex flex-col">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact.contactCardId}
              onClick={() => handleRowClick(contact)}
              className="border-gray-400 border-b p-4 hover:bg-primary/20 cursor-pointer"
            >
              <MemoizedContactRow
                fullName={contact.fullName}
                occupation={contact.occupation}
                company={contact.company}
                image={""}
                date={contact.createdAt}
                tag={contact.tag}
                onRemove={(e) => handleRemove(e, contact)}
              />
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-4">
            No Request Data
          </div>
        )}
      </div>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          if (!open && !isPendingDelete) setCurrentContactId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact</AlertDialogTitle>
            <AlertDialogDescription className="text-primary-foreground">
              This action will permanently remove the selected contact from your
              list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isPendingDelete}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmRemove}
              disabled={isPendingDelete}
            >
              {isPendingDelete ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {isSheetOpen && SheetData && (
        <ProfileCardSheet
          isOpen={isSheetOpen}
          setIsOpen={setIsSheetOpen}
          sheetData={SheetData}
          sheetVarient={SHEET_VARIENT.CONNECTION}
        />
      )}
    </div>
  );
}
