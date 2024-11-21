import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

interface ContactSheetProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rowData: any; // Receive row data as a prop
}

export default function ContactSheet({
  isOpen,
  setIsOpen,
  rowData,
}: ContactSheetProps) {
  if (!rowData) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Row Details</SheetTitle>
          <SheetDescription>
            Here are the details for the selected row.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4">
          {/* Render row data here */}
          <p>
            <strong>Username:</strong> {rowData.connectedUsername}
          </p>
          <p>
            <strong>Occupation:</strong> {rowData.connectedUserOccupation}
          </p>
          <p>
            <strong>Company:</strong> {rowData.connectedUserCompany}
          </p>
          <p>
            <strong>Tag:</strong> {rowData.tag}
          </p>
          <p>
            <strong>Connected Date:</strong>{" "}
            {new Date(rowData.connectedDate).toLocaleString()}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
