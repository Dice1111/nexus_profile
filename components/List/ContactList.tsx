"use client";

import {
  deleteContactAction,
  IDeleteContactActionState,
} from "@/app/(Dashboard)/contact/connection/action";
import { ContactWithSpecificCardData } from "@/core/_domain/types/contact-repository.types";
import React, {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useState,
} from "react";
import { displayErrorToast } from "../Box/errorToastBox";
import { displaySuccessToast } from "../Box/successToastBox";
import ContactRow from "../Row/ContactRow";
import ProfileCardSheet, {
  ConnectionSheetVarient,
  SHEET_VARIENT,
} from "../Sheet/ProfileCardSheet";
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

interface ContactListProps {
  contacts: ContactWithSpecificCardData[];
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
    if (!SheetData || !isSheetOpen) return;

    // Find the latest data for the open contact
    const updatedContact = contacts.find((c) => c.id === SheetData.contactId);

    if (updatedContact) {
      const newSheetData: ConnectionSheetVarient = {
        contactId: updatedContact.id,
        fullName:
          updatedContact.ContactCard?.Information?.fullName || "No Name",
        cardId: updatedContact.contactCardId,
        tag: updatedContact.tag,
        note: updatedContact.note,
        date: updatedContact.updatedAt.toLocaleDateString(),
      };
      setSheetData(newSheetData);
    }
  }, [contacts, SheetData?.contactId, isSheetOpen]);

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

  const handleRowClick = useCallback((rowData: ContactWithSpecificCardData) => {
    const sheetData: ConnectionSheetVarient = {
      contactId: rowData.id,
      fullName: rowData.ContactCard.Information.fullName,
      cardId: rowData.contactCardId,
      tag: rowData.tag,
      note: rowData.note,
      date: rowData.updatedAt.toLocaleDateString(),
    };
    setSheetData(sheetData);
    setIsSheetOpen(true);
  }, []);

  const handleRemove = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement>,
      contact: ContactWithSpecificCardData
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
      <div className="bg-secondary text-secondary-foreground rounded-lg flex flex-col divide-y divide-primary/20">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact.contactCardId}
              onClick={() => handleRowClick(contact)}
              className="p-4 hover:bg-primary/20 cursor-pointer"
            >
              <MemoizedContactRow
                fullName={contact.ContactCard.Information.fullName!}
                occupation={contact.ContactCard.Information.occupation!}
                company={contact.ContactCard.Information.company!}
                image={contact.ContactCard.Design.profileImage}
                date={contact.createdAt.toLocaleDateString()}
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
