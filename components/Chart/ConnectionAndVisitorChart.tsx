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

/**
 * This Chart accepts this type of rows to display
 */
export interface ConnectionAndVisitorChartRowType {
  date: Date;
  view: number;
  connection: number;
}

/**
 * This is the chart configuration for label names and colors
 */
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

/**
 * ConnectionAndVisitorChart Component
 */
export function ConnectionAndVisitorChart({
  chartData,
}: {
  chartData: ConnectionAndVisitorChartRowType[];
}) {
  // State to track the selected time range
  const [timeRange, setTimeRange] = React.useState("90d");

  // Determine the number of days to subtract based on the selected time range
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

  /**
   * The reference date is set to today (for dynamic time filtering),
   * and subtract the appropriate number of days based on the selected time range.
   */
  const startDate = new Date("2024-06-30"); // Change this to today date;
  startDate.setDate(startDate.getDate() - daysToSubtract);
  const startTimestamp = startDate.getTime();

  /**
   * Filter the chart data based on the selected time range.
   * Only include data where the date is greater than or equal to the start date (calculated above).
   */
  const filteredData = chartData.filter((item) => {
    const date = item.date.getTime();
    return date >= startTimestamp;
  });

  return (
    <Card>
      {/* Card Header with Title and Description */}
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          {/* Chart Title */}
          <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold">
            Connection Made and Profile View Count
          </CardTitle>
          {/* Chart Description, showing dynamic time range */}
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
        {/* Time Range Selector (Select Dropdown) */}
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] text-primary-foreground rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 90 days
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

      {/* Card Content: Chart Container */}
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {/* Chart Container */}
        <ChartContainer
          config={chartConfig} // Pass chart configuration
          className="aspect-auto h-[250px] w-full"
        >
          {/* Area Chart */}
          <AreaChart data={filteredData}>
            {/* Linear Gradient Definitions for "view" and "connection" areas */}
            <defs>
              <linearGradient id="fillconnection" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-connection)" // Color for connection area
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
                  stopColor="var(--color-view)" // Color for view area
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-view)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            {/* Cartesian Grid (background grid lines) */}
            <CartesianGrid vertical={false} />

            {/* X-Axis: Displaying Dates */}
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value); // Convert date to readable format
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            {/* Tooltip Component: Displayed on hover */}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="bg-secondary text-secondary-foreground"
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

            {/* Area for "View" Data */}
            <Area
              dataKey="view"
              type="natural"
              fill="url(#fillview)" // Gradient for the view area
              stroke="var(--color-view)" // Stroke color for the view area
              stackId="a"
            />

            {/* Area for "Connection" Data */}
            <Area
              dataKey="connection"
              type="natural"
              fill="url(#fillconnection)" // Gradient for the connection area
              stroke="var(--color-connection)" // Stroke color for the connection area
              stackId="a"
            />

            {/* Chart Legend */}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
