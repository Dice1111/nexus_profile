import { LuDot } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import PillShapeTag from "../Tag/PillShapeTag";
import { CONTACT_TAG_ENUM } from "@/core/_domain/enum/contact-repository.enum";
import { Button } from "../ui/button";
import { Link2 } from "lucide-react";

interface ContactRowProps {
  fullName: string;
  occupation: string | null;
  company: string | null;
  image: string | null;
  date: string;
  tag: CONTACT_TAG_ENUM;
  linkedCardTitle: string;
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ContactRow({
  fullName,
  occupation,
  company,
  image,
  date,
  tag,
  onRemove,
  linkedCardTitle,
}: ContactRowProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between gap-5 lg:gap-8 ">
      <div className="flex items-center gap-4 text-left">
        <Avatar className="w-14 h-14 rounded-full overflow-hidden">
          <AvatarImage
            className="object-cover w-full h-full"
            src={image || undefined}
            alt={fullName}
          />
          <AvatarFallback className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center rounded-full">
            {fullName?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col justify-between gap-1.5">
          <div className="flex gap-4">
            <p className="text-md font-semibold">{fullName}</p>
            <PillShapeTag tag={tag} />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2 text-sm text-primary">
            <p>{occupation}</p>
            <div className="hidden sm:flex items-center gap-2">
              <LuDot />
              <p>{company}</p>
            </div>
            <p className="sm:hidden">{company}</p>
          </div>
          <p className="text-xs text-blue-800 flex gap-2 items-center">
            <Link2 className="w-5 h-5" />

            {linkedCardTitle}
          </p>
          <p className="text-xs text-gray-500">Connected on: {date}</p>

          <div className="lg:hidden">
            <Button
              onClick={onRemove}
              variant="outline"
              size="sm"
              className="text-sm px-3 py-2 bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-2 text-primary">
        <Button
          onClick={onRemove}
          variant="outline"
          size="sm"
          className="text-sm px-3 py-2 bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
