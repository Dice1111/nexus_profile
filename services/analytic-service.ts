import { ConnectionAndVisitorChartRowType } from "@/components/Chart/ConnectionAndVisitorChart";
import { chartData } from "@/constant/appData";

export async function fetchViewCount(): Promise<number> {
  return 142034;
}
export async function fetchContactSavedCount(): Promise<number> {
  return 1324;
}
export async function fetchConnectionCount(): Promise<number> {
  return 10;
}
export async function fetchConnectionAndVisitorChartData(): Promise<
  ConnectionAndVisitorChartRowType[]
> {
  return chartData;
}


