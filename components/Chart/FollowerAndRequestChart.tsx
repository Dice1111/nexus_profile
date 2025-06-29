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

import { IDailyFollowerCountChartResponse } from "@/core/_domain/types/contact-repository.types";

const chartConfig = {
  count: {
    label: "Follower",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function FollowerChart({
  chartData,
}: {
  chartData: IDailyFollowerCountChartResponse[];
}) {
  const [timeRange, setTimeRange] = React.useState<"7d" | "30d">("30d");

  const daysToSubtract = timeRange === "7d" ? 7 : 30;

  const filteredData = React.useMemo(() => {
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - daysToSubtract);
    const thresholdStr = thresholdDate.toISOString().split("T")[0];

    return chartData.filter((item) => item.date >= thresholdStr);
  }, [chartData, daysToSubtract]);

  console.log("filterData", filteredData);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold">
            Follower Count
          </CardTitle>
          <CardDescription>
            Showing follower data for the last {daysToSubtract} days
          </CardDescription>
        </div>
        <Select
          value={timeRange}
          onValueChange={(val) => setTimeRange(val as "7d" | "30d")}
        >
          <SelectTrigger
            className="w-[160px] text-primary border-primary rounded-lg sm:ml-auto"
            aria-label="Select a time range"
          >
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
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
              <linearGradient id="fillview" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-count)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-count)"
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
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="bg-secondary"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="count"
              type="monotone"
              fill="url(#fillview)"
              stroke="var(--color-count)"
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
