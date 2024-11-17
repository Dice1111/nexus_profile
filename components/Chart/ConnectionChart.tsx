"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", count: 1 },
  { month: "February", count: 2 },
  { month: "March", count: 10 },
  { month: "April", count: 3 },
  { month: "May", count: 4 },
  { month: "June", count: 4 },
  { month: "July", count: 5 },
  { month: "August", count: 6 },
  { month: "September", count: 7 },
  { month: "October", count: 2 },
  { month: "November", count: 4 },
  { month: "December", count: 6 },
];

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ConnectionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connections Chart</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="bg-secondary text-secondary-foreground "
                  indicator="line"
                />
              }
            />
            <Line
              dataKey="count"
              type="natural"
              stroke="var(--color-count)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-count)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-chart-1"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          <p> Showing total visitors for 2024</p>
        </div>
      </CardFooter>
    </Card>
  );
}
