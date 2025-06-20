"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import InfoRow from "../Row/InfoRow";
import ProfileCardSheet, {
  RequestSheetVarient,
  SHEET_VARIENT,
} from "../Sheet/ProfileCardSheet";

import { IRequestWithSpecificCardData } from "@/core/_domain/repositories/types/request.type";
import {
  acceptRequestAction,
  deleteRequestAction,
  IAcceptRequestActionState,
  IDeleteRequestActionState,
} from "@/app/(Dashboard)/contact/request/action";
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
import { toast } from "sonner";

interface ConnectionRequestListProps {
  data: IRequestWithSpecificCardData[];
}

const acceptRequestActionInitialState: IAcceptRequestActionState = {
  success: false,
  message: "",
};

const deleteRequestActionInitialState: IDeleteRequestActionState = {
  success: false,
  message: "",
};

export default function ConnectionRequestList({
  data,
}: ConnectionRequestListProps) {
  const [requests, setRequests] = useState(data);
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

  useEffect(() => {
    setRequests(data);
  }, [data]);

  useEffect(() => {
    if (acceptState.success) {
      toast(acceptState.message, {
        duration: 1000,
        style: { backgroundColor: "green" },
      });
    } else if (!acceptState.success) {
      toast("wrong", {
        duration: 1000,
        style: { backgroundColor: "red" },
        position: "top-right",
      });
    }
  }, [acceptState.success, isPendingAccept]);

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

  const handleRowClick = (rowData: IRequestWithSpecificCardData) => {
    const data: RequestSheetVarient = {
      cardId: rowData.senderCardId,
      date: rowData.createdAt,
    };
    setSheetData(data);
    setIsSheetOpen(true);
  };

  const handleAccept = (
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
  };

  const handleConfirmAccept = () => {
    if (currentRequest) {
      startTransition(() => {
        acceptAction(currentRequest);
      });
    }
  };

  const handleReject = (
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
  };

  const handleConfirmDelete = () => {
    if (currentRequest) {
      startTransition(() => {
        deleteAction(currentRequest.requestId);
      });
    }
  };

  const renderRequestList = () => {
    return requests.length > 0 ? (
      <div className="bg-secondary text-secondary-foreground rounded-lg">
        {requests.map((request) => (
          <div
            key={request.senderCardId}
            onClick={() => handleRowClick(request)}
            className="border-gray-400 border-b p-4 hover:bg-primary/20 cursor-pointer"
          >
            <InfoRow
              fullName={request.fullName}
              occupation={request.occupation}
              company={request.company}
              image={""}
              date={request.createdAt}
              isRequest={true}
              onAccept={(e) => handleAccept(e, request)}
              onReject={(e) => handleReject(e, request)}
            />
          </div>
        ))}

        <AlertDialog
          open={isAcceptDialogOpen}
          onOpenChange={(open) => {
            if (!open && !isPendingAccept) {
              setCurrentRequest(null);
            }
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure to save this contact?
              </AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
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
            if (!open && !isPendingDelete) {
              setCurrentRequest(null);
            }
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure to delete this request?
              </AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={isPendingAccept}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className=""
                onClick={handleConfirmDelete}
                disabled={isPendingDelete}
              >
                {isPendingDelete ? "Deleting..." : "Continue"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    ) : (
      <div className="text-center text-muted-foreground py-4">
        No Request Data
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Connection Requests</h2>
      {renderRequestList()}
      {isSheetOpen && SheetData && (
        <ProfileCardSheet
          isOpen={isSheetOpen}
          setIsOpen={setIsSheetOpen}
          sheetData={SheetData}
          sheetVarient={SHEET_VARIENT.REQUEST} // Pass the selected row data
        />
      )}
    </div>
  );
}
