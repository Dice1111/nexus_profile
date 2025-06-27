import { LuDot } from "react-icons/lu"; // Assuming you're using this icon for separator
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button"; // Import Button from shadcn

import PillShapeTag from "../Tag/PillShapeTag";
import { CONTACT_TAG_ENUM } from "@/core/_domain/enum/contact-repository.enum";

interface InfoRowProps {
  fullName: string;
  occupation: string | null;
  company: string | null;
  image: string | null;
  date: string;
  tag?: CONTACT_TAG_ENUM;
  isRequest?: boolean;
  onAccept?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onReject?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function InfoRow({
  fullName,
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
    <div className="flex flex-col lg:flex-row lg:justify-between gap-5 lg:gap-8">
      {/* Left Section: Avatar and Contact Details */}
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Avatar */}
        <Avatar className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
          <AvatarImage
            className="object-cover w-full h-full"
            src={image || undefined}
            alt={fullName}
          />
          <AvatarFallback className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center rounded-full">
            {fullName?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Contact Details */}
        <div className="flex flex-col justify-between gap-1.5">
          <p className="text-md font-semibold">{fullName}</p>

          {/* Occupation + Company */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2 text-sm text-primary">
            <p>{occupation}</p>

            {/* Dot + company for sm and up */}
            <div className="hidden sm:flex items-center gap-2">
              <LuDot />
              <p>{company}</p>
            </div>

            {/* Company only for mobile */}
            <p className="sm:hidden">{company}</p>
          </div>

          {isRequest ? (
            <p className="text-xs text-gray-500 ">Requested on: {date}</p>
          ) : (
            <p className="text-xs text-gray-500">Connected on: {date}</p>
          )}

          <div className="lg:hidden">{RenderBadge()}</div>

          {isRequest && (
            <div className="lg:hidden">{RenderActionButtons()}</div>
          )}
        </div>
      </div>

      {/* Right Section */}
      {isRequest ? (
        <div className="hidden lg:flex items-center gap-3 text-primary">
          {RenderActionButtons()}
        </div>
      ) : (
        <div className="hidden lg:flex flex-col items-end gap-2 text-primary">
          {RenderBadge()}
        </div>
      )}
    </div>
  );
}
