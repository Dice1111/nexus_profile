"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import InfoRow from "../Row/InfoRow";
import ProfileCardSheet, {
  RequestSheetVarient,
  SHEET_VARIENT,
} from "../Sheet/ProfileCardSheet";

import { FlatRequestDTO } from "@/core/infrastructure/models/request";
import saveToContactAction from "@/actions/request-actions/saveToContactAction";

interface ConnectionRequestListProps {
  data: FlatRequestDTO[];
}

const initialState = {
  success: false,
  message: "",
};

export default function ConnectionRequestList({
  data,
}: ConnectionRequestListProps) {
  const [requests, setRequests] = useState(data);
  const [SheetData, setSheetData] = useState<RequestSheetVarient | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [state, action] = useActionState(saveToContactAction, initialState);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {}, [isPending]);

  useEffect(() => {
    setRequests(data);
  }, [data]);

  const handleRowClick = (rowData: FlatRequestDTO) => {
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
      action({ requestId, cardId, senderCardId });
    });
  };

  const handleReject = (
    event: React.MouseEvent<HTMLButtonElement>,
    requestId: number,
    cardId: string,
    senderCardId: string
  ) => {
    event.stopPropagation();
    // updateRequestList(requestID);
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
              firstName={request.firstName}
              middleName={request.middleName}
              lastName={request.lastName}
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
            {isPending && <p className="text-red-600"> Saving contact...</p>}
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
