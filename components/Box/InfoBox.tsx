import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import classNames from "classnames";

interface InfoBoxProps {
  data: {
    title: string;
    description: string;
    value: number;
  };
}

export function InfoBox({ data }: InfoBoxProps) {
  const { title, description, value } = data;

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row justify-between items-center p-4">
        <div>
          {/* Title and Description */}
          <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold">
            {title}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {description}
          </CardDescription>
        </div>

        {/* Value */}
        <p
          className={classNames("font-bold", {
            "text-sm sm:text-md md:text-lg lg:text-xl": value > 10000000,
            "text-lg sm:text- md:text-xl lg:text-2xl":
              value > 100000 && value <= 10000000,
            "text-lg sm:text-xl md:text-2xl lg:text-3xl":
              value > 1000 && value <= 100000,
            "text-1xl sm:text-2xl md:text-3xl lg:text-4xl": value <= 1000,
          })}
        >
          {new Intl.NumberFormat().format(value)}
        </p>
      </CardHeader>
      {/* Optional Footer */}
      <CardFooter className="text-xs sm:text-sm"></CardFooter>
    </Card>
  );
}
