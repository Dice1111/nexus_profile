import { LuDot } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface RequestRowProps {
  fullName: string;
  occupation: string | null;
  company: string | null;
  image: string | null;
  date: string;
  onAccept?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onReject?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function RequestRow({
  fullName,
  occupation,
  company,
  image,
  date,
  onAccept,
  onReject,
}: RequestRowProps) {
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
          <p className="text-md font-semibold">{fullName}</p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2 text-sm text-primary">
            <p>{occupation}</p>
            <div className="hidden sm:flex items-center gap-2">
              <LuDot />
              <p>{company}</p>
            </div>
            <p className="sm:hidden">{company}</p>
          </div>

          <p className="text-xs text-gray-500">Requested on: {date}</p>

          <div className="lg:hidden">{RenderActionButtons()}</div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-3 text-primary">
        {RenderActionButtons()}
      </div>
    </div>
  );
}
