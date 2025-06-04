"use client";

import { useEffect, useState } from "react";
import InfoRow from "../Row/InfoRow";
import ProfileCardSheet, {
  RequestSheetVarient,
  SHEET_VARIENT,
} from "../Sheet/ProfileCardSheet";

import { FlatRequestDTO } from "@/data-access/request";

interface ConnectionRequestListProps {
  data: FlatRequestDTO[];
}

export default function ConnectionRequestList({
  data,
}: ConnectionRequestListProps) {
  const [requests, setRequests] = useState(data);
  const [SheetData, setSheetData] = useState<RequestSheetVarient | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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

  const updateRequestList = (requestID: string) => {
    const updatedRequests = requests.filter(
      (request) => request.senderCardId !== requestID
    );
    setRequests(updatedRequests);
  };

  const handleAccept = (
    event: React.MouseEvent<HTMLButtonElement>,
    requestID: string
  ) => {
    event.stopPropagation();
    updateRequestList(requestID);
  };

  const handleReject = (
    event: React.MouseEvent<HTMLButtonElement>,
    requestID: string
  ) => {
    event.stopPropagation();
    updateRequestList(requestID);
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
              onAccept={(e) => handleAccept(e, request.senderCardId)}
              onReject={(e) => handleReject(e, request.senderCardId)}
            />
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
