"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import InfoRow from "../Row/InfoRow";
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
import ConfirmDialog from "../dialog/comfirm-dialog";

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

interface dialogDataProps {
  title: string;
  isLoading: boolean;
  confirmAction: () => void;
}

export default function ConnectionRequestList({
  data,
}: ConnectionRequestListProps) {
  const [requests, setRequests] = useState(data);
  const [SheetData, setSheetData] = useState<RequestSheetVarient | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const [dialogDataProps, setDialogDataProps] =
    useState<dialogDataProps | null>(null);
  useEffect(() => {
    setRequests(data);
  }, [data]);

  useEffect(() => {
    if (!isPendingAccept || !isPendingDelete) {
      setCurrentRequest(null);
      setIsDialogOpen(false);
      console.log(acceptState.message);
      console.log(deleteState.message);
    }
  }, [isPendingAccept, isPendingDelete]);

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
    setDialogDataProps({
      title: "Are you sure to save this contact?",
      isLoading: isPendingAccept,
      confirmAction: handleConfirmAccept,
    });
    setIsDialogOpen(true);
  };

  const handleConfirmAccept = () => {
    if (currentRequest) {
      startTransition(() => {
        acceptAction(currentRequest);
      });
    }
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    req: IRequestWithSpecificCardData
  ) => {
    event.stopPropagation();
    setCurrentRequest({
      requestId: req.id,
      cardId: req.cardId,
      senderCardId: req.senderCardId,
    });
    setDialogDataProps({
      title: "Are you sure to delete this?",
      isLoading: isPendingDelete,
      confirmAction: handleConfirmDelete,
    });
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Hello world");
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
              onReject={(e) => handleDelete(e, request)}
            />
            {isPendingAccept && (
              <p className="text-red-600"> Saving contact...</p>
            )}
          </div>
        ))}

        <ConfirmDialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            if (!open && !dialogDataProps?.isLoading) {
              setCurrentRequest(null);
            }
          }}
          title={dialogDataProps?.title ?? ""}
          isLoading={dialogDataProps?.isLoading ?? false}
          onConfirm={handleConfirmAccept ?? (() => console.log("apple"))}
          onCancel={() => setIsDialogOpen(false)}
        />
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
          sheetVarient={SHEET_VARIENT.REQUEST}
        />
      )}
    </div>
  );
}
