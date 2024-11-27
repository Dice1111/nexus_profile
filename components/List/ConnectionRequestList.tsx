"use client";

import { ConnectionRequestWithDetails } from "@/services/contact-service";
import { useState } from "react";
import InfoRow from "../Row/InfoRow";
import ProfileCardSheet from "../Sheet/ProfileCardSheet";

interface ConnectionRequestListProps {
  data: ConnectionRequestWithDetails[];
}

export default function ConnectionRequestList({
  data,
}: ConnectionRequestListProps) {
  const [requests, setRequests] = useState(data);
  const [selectedRowData, setSelectedRowData] = useState<number | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleRowClick = (rowData: number) => {
    setSelectedRowData(rowData);
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
            onClick={() => handleRowClick(request.senderCardID)}
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
      {isSheetOpen && (
        <ProfileCardSheet
          isOpen={isSheetOpen}
          setIsOpen={setIsSheetOpen}
          cardId={selectedRowData} // Pass the selected row data
        />
      )}
    </div>
  );
}
