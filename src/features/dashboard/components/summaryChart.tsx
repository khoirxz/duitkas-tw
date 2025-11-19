import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { UpSquareIcon } from "@/assets/icons/outline";
import type { PengeluaranPemasukanTahunIni } from "../types/dashboard";
import { useIsMobile } from "@/components/use-mobile";

const chartConfig = {
  pemasukan: {
    label: "Pemasukan",
  },
} satisfies ChartConfig;

export default function SummaryChart({
  data,
}: {
  data: PengeluaranPemasukanTahunIni[];
}) {
  const isMobile = useIsMobile();
  const formatYAxis = (value: number) => {
    const sign = value < 0 ? "-" : "";
    const abs = Math.abs(value);
    if (abs >= 1_000_000_000)
      return `${sign}${(abs / 1_000_000_000).toFixed(1)}B`;
    if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(1)}M`;
    if (abs >= 1_000) return `${sign}${(abs / 1_000).toFixed(1)}k`;
    return `${value}`;
  };
  const formatData = (data: PengeluaranPemasukanTahunIni[]) => {
    return data.map((item) => ({
      month: item.month.slice(0, 3),
      pemasukan: item.pemasukan,
      pengeluaran: item.pengeluaran,
    }));
  };

  return (
    <div className="flex flex-col justify-between h-full space-y-5">
      <div className="flex flex-col md:flex-row items-start md:justify-between gap-3">
        <p className="font-semibold">Ringkasan Arus Keuangan</p>

        <span className="bg-green-200 text-green-700 py-1 px-2 rounded-lg font-bold text-sm flex flex-row gap-1 items-center">
          <UpSquareIcon className="w-5 h-5" color="#008236" />
          <span>20.4% dari bulan lalu</span>
        </span>
      </div>

      <div className="relative h-full w-full overflow-x-auto sm:overflow-visible">
        <div className="h-full min-w-[720px] sm:min-w-full">
          <ChartContainer config={chartConfig} className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                accessibilityLayer
                data={formatData(data)}
                stackOffset="sign"
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                <CartesianGrid vertical={false} />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value: number, name: string) => [
                    `Rp. ${value} `,
                    name === "pemasukan" ? "Pemasukan" : "Pengeluaran",
                  ]}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: isMobile ? 10 : 12, fill: "#64748b" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatYAxis}
                  width={isMobile ? 28 : 40}
                  tick={{ fontSize: isMobile ? 10 : 12, fill: "#64748b" }}
                  tickCount={isMobile ? 5 : 7}
                  domain={[-200, 400]}
                />
                <ReferenceLine y={0} stroke="#000" />
                <Bar
                  dataKey={"pemasukan"}
                  fill="#2B63E2"
                  stackId={"1"}
                  radius={[100, 100, 0, 0]}
                />
                <Bar
                  dataKey={"pengeluaran"}
                  fill="#EF9E4D"
                  stackId={"1"}
                  radius={[100, 100, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
