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

export interface InfoBoxProps {
  title: string;
  description: string;
  value: number;
  type: InfoBox_Type;
}

export enum InfoBox_Type {
  CONNECTION,
  VIEW,
  CONTACT,
}

export function InfoBox({ ...data }: InfoBoxProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row justify-between items-center p-4">
        <div>
          <CardTitle className="text-base  sm:text-lg lg:text-xl font-semibold">
            {data.title}
          </CardTitle>
          <CardDescription className="text-sm ">
            {data.description}
          </CardDescription>
        </div>
        <div className="flex justify-end items-center bg-primary rounded-full p-2">
          {data.type === InfoBox_Type.VIEW ? (
            <PiEyeFill className="text-primary-foreground text-xl" />
          ) : data.type === InfoBox_Type.CONNECTION ? (
            <BsFillPeopleFill className="text-primary-foreground text-xl " />
          ) : data.type === InfoBox_Type.CONTACT ? (
            <MdContactPhone className="text-primary-foreground text-xl " />
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">
          {new Intl.NumberFormat().format(data.value)}
        </p>
      </CardContent>
    </Card>
  );
}
