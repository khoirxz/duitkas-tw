import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DashboardProps } from "../types/dashboard";
import { formatRupiah } from "@/lib/formatMoney";

interface DebsBalanceProps {
  data: {
    total_hutang: DashboardProps["data"]["total_hutang"];
    total_piutang: DashboardProps["data"]["total_piutang"];
  };
}

export default function DebsBalance({ data }: DebsBalanceProps) {
  // Hitung total keseluruhan
  const total = data.total_hutang + data.total_piutang;

  // Gunakan kondisi untuk menghindari pembagian dengan nol jika totalnya 0.
  const incomePercentage = total > 0 ? (data.total_hutang / total) * 100 : 0;
  return (
    <div className="shadow-lg rounded-2xl h-full p-5 border flex flex-col justify-between bg-white dark:bg-zinc-800">
      <div className="flex flex-row justify-between items-center">
        <p className="font-semibold">Hutang Piutang</p>

        <Button
          size="icon"
          className="bg-transparent rounded-full hover:bg-primary/10 p-1">
          <ChevronRight className="w-4 h-4 text-black dark:text-white" />
        </Button>
      </div>

      <div className="relative w-full h-7 bg-blue-100 rounded-2xl overflow-hidden mt-1">
        <div
          className="absolute top-0 left-0 h-full bg-amber-500"
          style={{
            width: `${incomePercentage}%`,
            borderRadius: "16px 0 0 16px",
          }} // Atur radius hanya di kiri
        ></div>
      </div>

      <div className="mt-3">
        <div className="flex flex-row justify-between items-center border-t border-[#EFEFEF] dark:border-zinc-600 py-2.5">
          <div className="flex flex-row items-center gap-2">
            <span className="h-2.5 w-6 bg-amber-500 rounded-full"></span>
            <p className="text-sm">Total Hutang</p>
          </div>
          <button className="flex flex-row items-center gap-2 rounded-lg">
            <span className="font-domine font-bold">
              {formatRupiah(data.total_hutang)}
            </span>
          </button>
        </div>
        <div className="flex flex-row justify-between items-center border-t border-[#EFEFEF] dark:border-zinc-600 py-2.5">
          <div className="flex flex-row items-center gap-2">
            <span className="h-2.5 w-6 bg-blue-100 rounded-full"></span>
            <p className="text-sm">Total Piutang</p>
          </div>
          <button className="flex flex-row items-center gap-2 rounded-lg">
            <span className="font-domine font-bold">
              {formatRupiah(data.total_piutang)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
