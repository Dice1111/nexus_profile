import { BsFillPeopleFill } from "react-icons/bs";
import { MdContactPhone } from "react-icons/md";
import { PiEyeFill } from "react-icons/pi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SquareUser, UserPlus, Users } from "lucide-react";

/**
 *  Define the props interface for the InfoBox
 */
export interface InfoBoxProps {
  data: {
    title: string;
    description: string;
    value: number;
    type: InfoBox_Type;
  };
}
// ****
//   Define enum for type (for icon)
// ****
export enum InfoBox_Type {
  CONNECTION,
  FOLLOWER,
  REQUEST,
}

// ****
//   Define icon for each type
// ****
const baseIconClass = "text-primary-foreground text-xl";

const iconMap = {
  [InfoBox_Type.FOLLOWER]: <Users className={baseIconClass} />,
  [InfoBox_Type.CONNECTION]: <SquareUser className={baseIconClass} />,
  [InfoBox_Type.REQUEST]: <UserPlus className={baseIconClass} />,
};

// ****
//   InfoBox component
// ****
export function InfoBox({ data }: InfoBoxProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row justify-between items-center p-4">
        {/* Left Section: Title and Description */}
        <div>
          <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold">
            {data.title}
          </CardTitle>
          <CardDescription className="text-sm">
            {data.description}
          </CardDescription>
        </div>
        {/* Right Section: Icon */}
        <div className="flex justify-end items-center bg-primary rounded-full p-2">
          {iconMap[data.type] || null}
        </div>
      </CardHeader>

      {/* Card Content: Display Value */}
      <CardContent>
        <p className="text-2xl font-semibold">
          {new Intl.NumberFormat().format(data.value)}
        </p>
      </CardContent>
    </Card>
  );
}
