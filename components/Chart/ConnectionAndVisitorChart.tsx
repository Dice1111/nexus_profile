"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const chartData = [
  { date: "2024-04-01", view: 222, connection: 150 },
  { date: "2024-04-02", view: 97, connection: 180 },
  { date: "2024-04-03", view: 167, connection: 167 },
  { date: "2024-04-04", view: 260, connection: 260 },
  { date: "2024-04-05", view: 373, connection: 290 },
  { date: "2024-04-06", view: 301, connection: 340 },
  { date: "2024-04-07", view: 245, connection: 180 },
  { date: "2024-04-08", view: 409, connection: 320 },
  { date: "2024-04-09", view: 59, connection: 110 },
  { date: "2024-04-10", view: 261, connection: 190 },
  { date: "2024-04-11", view: 327, connection: 350 },
  { date: "2024-04-12", view: 292, connection: 210 },
  { date: "2024-04-13", view: 342, connection: 380 },
  { date: "2024-04-14", view: 137, connection: 220 },
  { date: "2024-04-15", view: 120, connection: 170 },
  { date: "2024-04-16", view: 138, connection: 190 },
  { date: "2024-04-17", view: 446, connection: 360 },
  { date: "2024-04-18", view: 364, connection: 410 },
  { date: "2024-04-19", view: 243, connection: 180 },
  { date: "2024-04-20", view: 89, connection: 150 },
  { date: "2024-04-21", view: 137, connection: 200 },
  { date: "2024-04-22", view: 224, connection: 170 },
  { date: "2024-04-23", view: 138, connection: 230 },
  { date: "2024-04-24", view: 387, connection: 290 },
  { date: "2024-04-25", view: 215, connection: 250 },
  { date: "2024-04-26", view: 75, connection: 130 },
  { date: "2024-04-27", view: 383, connection: 420 },
  { date: "2024-04-28", view: 122, connection: 180 },
  { date: "2024-04-29", view: 315, connection: 240 },
  { date: "2024-04-30", view: 454, connection: 380 },
  { date: "2024-05-01", view: 165, connection: 220 },
  { date: "2024-05-02", view: 293, connection: 310 },
  { date: "2024-05-03", view: 247, connection: 190 },
  { date: "2024-05-04", view: 385, connection: 420 },
  { date: "2024-05-05", view: 481, connection: 390 },
  { date: "2024-05-06", view: 498, connection: 520 },
  { date: "2024-05-07", view: 388, connection: 300 },
  { date: "2024-05-08", view: 149, connection: 210 },
  { date: "2024-05-09", view: 227, connection: 180 },
  { date: "2024-05-10", view: 293, connection: 330 },
  { date: "2024-05-11", view: 335, connection: 270 },
  { date: "2024-05-12", view: 197, connection: 240 },
  { date: "2024-05-13", view: 197, connection: 160 },
  { date: "2024-05-14", view: 448, connection: 490 },
  { date: "2024-05-15", view: 473, connection: 380 },
  { date: "2024-05-16", view: 338, connection: 400 },
  { date: "2024-05-17", view: 499, connection: 420 },
  { date: "2024-05-18", view: 315, connection: 350 },
  { date: "2024-05-19", view: 235, connection: 180 },
  { date: "2024-05-20", view: 177, connection: 230 },
  { date: "2024-05-21", view: 82, connection: 140 },
  { date: "2024-05-22", view: 81, connection: 120 },
  { date: "2024-05-23", view: 252, connection: 290 },
  { date: "2024-05-24", view: 294, connection: 220 },
  { date: "2024-05-25", view: 201, connection: 250 },
  { date: "2024-05-26", view: 213, connection: 170 },
  { date: "2024-05-27", view: 420, connection: 460 },
  { date: "2024-05-28", view: 233, connection: 190 },
  { date: "2024-05-29", view: 78, connection: 130 },
  { date: "2024-05-30", view: 340, connection: 280 },
  { date: "2024-05-31", view: 178, connection: 230 },
  { date: "2024-06-01", view: 178, connection: 200 },
  { date: "2024-06-02", view: 470, connection: 410 },
  { date: "2024-06-03", view: 103, connection: 160 },
  { date: "2024-06-04", view: 439, connection: 380 },
  { date: "2024-06-05", view: 88, connection: 140 },
  { date: "2024-06-06", view: 294, connection: 250 },
  { date: "2024-06-07", view: 323, connection: 370 },
  { date: "2024-06-08", view: 385, connection: 320 },
  { date: "2024-06-09", view: 438, connection: 480 },
  { date: "2024-06-10", view: 155, connection: 200 },
  { date: "2024-06-11", view: 92, connection: 150 },
  { date: "2024-06-12", view: 492, connection: 420 },
  { date: "2024-06-13", view: 81, connection: 130 },
  { date: "2024-06-14", view: 426, connection: 380 },
  { date: "2024-06-15", view: 307, connection: 350 },
  { date: "2024-06-16", view: 371, connection: 310 },
  { date: "2024-06-17", view: 475, connection: 520 },
  { date: "2024-06-18", view: 107, connection: 170 },
  { date: "2024-06-19", view: 341, connection: 290 },
  { date: "2024-06-20", view: 408, connection: 450 },
  { date: "2024-06-21", view: 169, connection: 210 },
  { date: "2024-06-22", view: 317, connection: 270 },
  { date: "2024-06-23", view: 480, connection: 530 },
  { date: "2024-06-24", view: 132, connection: 180 },
  { date: "2024-06-25", view: 141, connection: 190 },
  { date: "2024-06-26", view: 434, connection: 380 },
  { date: "2024-06-27", view: 448, connection: 490 },
  { date: "2024-06-28", view: 144, connection: 149 },
  { date: "2024-06-29", view: 160, connection: 109 },
  { date: "2024-06-30", view: 442, connection: 446 },
];

const chartConfig = {
  view: {
    label: "view",
    color: "hsl(var(--chart-1))",
  },
  connection: {
    label: "connection",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ConnectionAndVisitorChart() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract: number;
    switch (timeRange) {
      case "90d":
        daysToSubtract = 90;
        break;
      case "30d":
        daysToSubtract = 30;
        break;
      case "7d":
        daysToSubtract = 7;
        break;
      default:
        daysToSubtract = 90;
        break;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-base  sm:text-lg lg:text-xl font-semibold">
            Connection Made and Profile View Count
          </CardTitle>
          <CardDescription>
            Showing total connection and view for the last
            {timeRange === "90d"
              ? " 90 "
              : timeRange === "30d"
              ? " 30 "
              : " 7 "}
            days
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] text-primary-foreground rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillconnection" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-connection)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-connection)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillview" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-view)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-view)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="bg-secondary text-secondary-foreground "
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="view"
              type="natural"
              fill="url(#fillview)"
              stroke="var(--color-view)"
              stackId="a"
            />
            <Area
              dataKey="connection"
              type="natural"
              fill="url(#fillconnection)"
              stroke="var(--color-connection)"
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
