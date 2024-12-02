import { LuDot } from "react-icons/lu"; // Assuming you're using this icon for separator
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button"; // Import Button from shadcn
import { CONTACT_TAG_TYPE } from "@/lib/type";
import PillShapeTag from "../Tag/PillShapeTag";

interface InfoRowProps {
  fullname: string;
  occupation: string;
  company: string;
  image?: string;
  date: Date;
  tag?: CONTACT_TAG_TYPE;
  isRequest?: boolean;
  onAccept?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onReject?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function InfoRow({
  fullname,
  occupation,
  company,
  image,
  date,
  tag,
  isRequest = false,
  onAccept,
  onReject,
}: InfoRowProps) {
  const RenderBadge = () => tag && <PillShapeTag tag={tag} />;

  const RenderActionButtons = () => (
    <div className="flex gap-3">
      <Button
        variant="outline"
        size="sm"
        className="text-sm px-3 py-2 bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
        onClick={onAccept}
      >
        Confirm
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-sm px-3 py-2 bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
        onClick={onReject}
      >
        Delete
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-6">
      {/* Left Section: Avatar and Contact Details */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <Avatar className="w-12 h-12  sm:w-14 sm:h-14">
          <AvatarImage
            className="object-cover"
            src={image || undefined}
            alt={fullname}
          />
          <AvatarFallback className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center">
            {fullname?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Contact Details */}
        <div className="flex flex-col justify-between">
          <p className="text-md sm:text-base font-semibold">{fullname}</p>
          <div className="flex items-center gap-2 text-xs font-light text-primary">
            <p>{occupation}</p>
            <div className="hidden sm:flex items-center gap-2">
              <LuDot />
              <p>{company}</p>
            </div>
          </div>
          {isRequest && (
            <div className="mt-2 text-xs text-gray-500">
              <p>Requested on: {new Date(date).toLocaleDateString()}</p>
            </div>
          )}
          <div className="lg:hidden mt-2">{RenderBadge()}</div>
          {isRequest && (
            <div className="lg:hidden mt-3">{RenderActionButtons()}</div>
          )}
        </div>
      </div>

      {/* Right Section */}
      {isRequest ? (
        <div className="hidden lg:flex items-center gap-3 text-primary">
          {RenderActionButtons()}
        </div>
      ) : (
        <div className="hidden lg:flex flex-col items-end gap-3 text-primary">
          {RenderBadge()}
          <p className="text-sm sm:text-xs">
            Connected on: {new Date(date).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}
