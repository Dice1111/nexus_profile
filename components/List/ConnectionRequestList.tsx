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
  const [acceptRequestActionState, acceptAction, isAcceptRequestPending] =
    useActionState(acceptRequestAction, acceptRequestActionInitialState);

  const [deleteRequstActionState, deleteAction, isDeleteRequestPending] =
    useActionState(deleteRequestAction, deleteRequestActionInitialState);

  useEffect(() => {
    setRequests(data);
  }, [data]);

  const handleRowClick = (rowData: IRequestWithSpecificCardData) => {
    const data: RequestSheetVarient = {
      cardId: rowData.senderCardId,
      date: rowData.createdAt,
    };
    setSheetData(data);
    setIsSheetOpen(true);
  };

  const handleAccept = (
    event: React.MouseEvent<HTMLButtonElement>,
    requestId: number,
    cardId: string,
    senderCardId: string
  ) => {
    event.stopPropagation();
    startTransition(() => {
      acceptAction({
        requestId,
        cardId,
        senderCardId,
      });
    });
  };

  const handleReject = (
    event: React.MouseEvent<HTMLButtonElement>,
    requestId: number,
    cardId: string,
    senderCardId: string
  ) => {
    event.stopPropagation();

    startTransition(() => {
      deleteAction(requestId);
    });
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
              onAccept={(e) =>
                handleAccept(
                  e,
                  request.id,
                  request.cardId,
                  request.senderCardId
                )
              }
              onReject={(e) =>
                handleReject(
                  e,
                  request.id,
                  request.cardId,
                  request.senderCardId
                )
              }
            />
            {isAcceptRequestPending && (
              <p className="text-red-600"> Saving contact...</p>
            )}
          </div>
        ))}
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
