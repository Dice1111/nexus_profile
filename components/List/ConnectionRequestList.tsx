"use client";

import { ConnectionRequestWithDetails } from "@/services/contact-service";
import { useState } from "react";
import InfoRow from "../Row/InfoRow";
import ProfileCardSheet, {
  RequestSheetVarient,
  SHEET_VARIENT,
} from "../Sheet/ProfileCardSheet";

interface ConnectionRequestListProps {
  data: ConnectionRequestWithDetails[];
}

export default function ConnectionRequestList({
  data,
}: ConnectionRequestListProps) {
  const [requests, setRequests] = useState(data);
  const [SheetData, setSheetData] = useState<RequestSheetVarient | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleRowClick = (rowData: ConnectionRequestWithDetails) => {
    const data: RequestSheetVarient = {
      cardId: rowData.senderCardID,
      name: rowData.senderUsername,
      date: new Date(rowData.created_at),
    };
    setSheetData(data);
    setIsSheetOpen(true);
  };

  const updateRequestList = (requestID: number) => {
    const updatedRequests = requests.filter(
      (request) => request.requestID !== requestID
    );
    setRequests(updatedRequests);
  };

  const handleAccept = (
    event: React.MouseEvent<HTMLButtonElement>,
    requestID: number
  ) => {
    event.stopPropagation();
    updateRequestList(requestID);
  };

  const handleReject = (
    event: React.MouseEvent<HTMLButtonElement>,
    requestID: number
  ) => {
    event.stopPropagation();
    updateRequestList(requestID);
  };

  const renderRequestList = () => {
    return requests.length > 0 ? (
      <div className="bg-secondary text-secondary-foreground rounded-lg">
        {requests.map((request) => (
          <div
            key={request.requestID}
            onClick={() => handleRowClick(request)}
            className="border-gray-400 border-b p-4 hover:bg-primary/20 cursor-pointer"
          >
            <InfoRow
              key={request.requestID}
              name={request.senderUsername}
              occupation={request.senderOccupation}
              company={request.senderCompany}
              image={request.senderImage}
              date={request.created_at}
              isRequest={true}
              onAccept={(e) => handleAccept(e, request.requestID)}
              onReject={(e) => handleReject(e, request.requestID)}
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
