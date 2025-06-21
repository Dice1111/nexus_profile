"use client";

import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useState,
} from "react";
import ProfileCardSheet, {
  RequestSheetVarient,
  SHEET_VARIENT,
} from "../Sheet/ProfileCardSheet";

import {
  acceptRequestAction,
  deleteRequestAction,
  IAcceptRequestActionState,
  IDeleteRequestActionState,
} from "@/app/(Dashboard)/contact/request/action";
import { IRequestWithSpecificCardData } from "@/core/_domain/repositories/types/request.type";
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

import React from "react";
import { displayErrorToast } from "../Box/errorToastBox";
import { displaySuccessToast } from "../Box/successToastBox";
import RequestRow from "../Row/RequestRow";

interface ConnectionRequestListProps {
  requests: IRequestWithSpecificCardData[];
}

const acceptRequestActionInitialState: IAcceptRequestActionState = {
  success: false,
  message: "",
};

const deleteRequestActionInitialState: IDeleteRequestActionState = {
  success: false,
  message: "",
};

const MemoizedRequestRow = React.memo(RequestRow);

export default function ConnectionRequestList({
  requests,
}: ConnectionRequestListProps) {
  const [SheetData, setSheetData] = useState<RequestSheetVarient | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [acceptState, acceptAction, isPendingAccept] = useActionState(
    acceptRequestAction,
    acceptRequestActionInitialState
  );
  const [deleteState, deleteAction, isPendingDelete] = useActionState(
    deleteRequestAction,
    deleteRequestActionInitialState
  );

  const [currentRequest, setCurrentRequest] = useState<{
    requestId: number;
    cardId: string;
    senderCardId: string;
  } | null>(null);

  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [isAcceptActionTriggered, setIsAcceptActionTriggered] = useState(false);
  const [isDeleteActionTriggered, setIsDeleteActionTriggered] = useState(false);

  useEffect(() => {
    if (isAcceptActionTriggered && !isPendingAccept) {
      if (acceptState.success) {
        displaySuccessToast({ message: acceptState.message });
      } else if (!acceptState.success) {
        displayErrorToast({ message: acceptState.message });
      }
      setIsAcceptActionTriggered(false);
    }
  }, [isAcceptActionTriggered, acceptState, isPendingAccept]);

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
    if (!isPendingAccept) {
      setCurrentRequest(null);
      setIsAcceptDialogOpen(false);
    }
  }, [isPendingAccept]);

  useEffect(() => {
    if (!isPendingDelete) {
      setCurrentRequest(null);
      setIsDeleteDialogOpen(false);
    }
  }, [isPendingDelete]);

  const handleRowClick = useCallback(
    (rowData: IRequestWithSpecificCardData) => {
      const data: RequestSheetVarient = {
        cardId: rowData.senderCardId,
        date: rowData.createdAt,
      };
      setSheetData(data);
      setIsSheetOpen(true);
    },
    []
  );

  const handleAccept = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement>,
      req: IRequestWithSpecificCardData
    ) => {
      e.stopPropagation();
      setCurrentRequest({
        requestId: req.id,
        cardId: req.cardId,
        senderCardId: req.senderCardId,
      });
      setIsAcceptDialogOpen(true);
    },
    []
  );

  const handleConfirmAccept = () => {
    if (currentRequest) {
      startTransition(() => {
        acceptAction(currentRequest);
        setIsAcceptActionTriggered(true);
      });
    }
  };

  const handleReject = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement>,
      req: IRequestWithSpecificCardData
    ) => {
      event.stopPropagation();

      setCurrentRequest({
        requestId: req.id,
        cardId: req.cardId,
        senderCardId: req.senderCardId,
      });
      setIsDeleteDialogOpen(true);
    },
    []
  );
  const handleConfirmDelete = () => {
    if (currentRequest) {
      startTransition(() => {
        deleteAction(currentRequest.requestId);
        setIsDeleteActionTriggered(true);
      });
    }
  };

  return (
    <div>
      <div className="bg-secondary text-secondary-foreground rounded-lg flex flex-col">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request.senderCardId}
              onClick={() => handleRowClick(request)}
              className="border-gray-400 border-b p-4 hover:bg-primary/20 cursor-pointer"
            >
              <MemoizedRequestRow
                fullName={request.fullName}
                occupation={request.occupation}
                company={request.company}
                image={""}
                date={request.createdAt}
                onAccept={(e) => handleAccept(e, request)}
                onReject={(e) => handleReject(e, request)}
              />
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-4">
            No Request Data
          </div>
        )}
      </div>

      {/* AlertDialogs should be outside the list */}
      <AlertDialog
        open={isAcceptDialogOpen}
        onOpenChange={(open) => {
          if (!open && !isPendingAccept) setCurrentRequest(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Contact</AlertDialogTitle>
            <AlertDialogDescription className="text-primary-foreground">
              This action will save the selected contact to your connection
              list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setIsAcceptDialogOpen(false)}
              disabled={isPendingAccept}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmAccept}
              disabled={isPendingAccept}
            >
              {isPendingAccept ? "Saving..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          if (!open && !isPendingDelete) setCurrentRequest(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Request</AlertDialogTitle>
            <AlertDialogDescription className="text-primary-foreground">
              This action will permanently remove the selected request from your
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
              onClick={handleConfirmDelete}
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
          sheetVarient={SHEET_VARIENT.REQUEST}
        />
      )}
    </div>
  );
}
