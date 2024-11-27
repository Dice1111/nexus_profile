import { fetchWithTryCatch } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

interface ProfileCardSheetProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cardId: number | null;
}

export default function ProfileCardSheet({
  isOpen,
  setIsOpen,
  cardId,
}: ProfileCardSheetProps) {
  if (!cardId) return null;

  // const CardData = fetchWithTryCatch(?)

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
            <strong>Card Id:</strong> {cardId}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
