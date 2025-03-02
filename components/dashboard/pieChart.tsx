"use client";

import { TrendingUp } from "lucide-react";
import { Label, LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartLegend,
  ChartConfig,
  ChartContainer,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {} satisfies ChartConfig;

export default function ShadPieChart({ data }: { data: any }) {
  console.log(data);

  return (
    <Card className="flex flex-col min-h-[400px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Cost Breakdown</CardTitle>
        <CardDescription>Breakdown of your expenses by items</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] "
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={data} dataKey="value" label></Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
