import { Button } from "@/components/ui/button";
import useScroll from "@/hooks/use-scroll";

import { ChevronRightIcon } from "@/assets/icons/outline";
import { AnimatePresence } from "motion/react";
import type { DashboardProps } from "../types/dashboard";
import { formatRupiah } from "@/lib/formatMoney";

interface AccountProps {
  data: DashboardProps["data"]["all_bank"];
}

export default function Account({ data }: AccountProps) {
  const { scrollRef, scrollPosition, handleScroll, ScrollIndicator } =
    useScroll();

  return (
    <div className="shadow-lg rounded-2xl h-full p-5 border flex flex-col md:justify-between">
      <div className="flex flex-row justify-between items-center">
        <p className="font-semibold">Akun</p>

        <Button
          size="icon"
          className="bg-white rounded-full hover:bg-primary/10 p-0">
          <ChevronRightIcon className="w-4 h-4" color="black" />
        </Button>
      </div>

      {data.length >= 0 && data !== null ? (
        <div className="relative md:h-[750px]">
          <div
            className="flex md:flex-col gap-6 overflow-auto h-[240px] md:h-full snap-x snap-mandatory relative scroll-smooth no-scrollbar::-webkit-scrollbar no-scrollbar"
            ref={scrollRef}
            onScroll={handleScroll}>
            {data.map((data, index) => (
              <AccountItem key={index} data={data} />
            ))}
          </div>
          <AnimatePresence>
            {(scrollPosition === "top" || scrollPosition === "middle") && (
              <ScrollIndicator position="bottom" vertical={true} />
            )}

            {(scrollPosition === "bottom" || scrollPosition === "middle") && (
              <ScrollIndicator position="top" vertical={true} />
            )}
          </AnimatePresence>
        </div>
      ) : null}
    </div>
  );
}

interface AccountItemProps {
  data: DashboardProps["data"]["all_bank"][0];
}

const AccountItem: React.FC<AccountItemProps> = ({ data }) => {
  // Hitung total keseluruhan
  const total = data.total_pemasukan + data.total_pengeluaran;

  // Gunakan kondisi untuk menghindari pembagian dengan nol jika totalnya 0.
  const incomePercentage = total > 0 ? (data.total_pemasukan / total) * 100 : 0;

  return (
    <div className="flex flex-col gap-3.5 w-full shrink-0 snap-start">
      <p>
        {data.nama_bank} - {data.atas_nama}
      </p>
      <div className="flex flex-row justify-between text-2xl font-bold">
        <span>Rp.</span>
        <span>{formatRupiah(data.saldo_awal)}</span>
      </div>
      <div>
        <div className="relative w-full h-6 bg-amber-500 rounded-2xl overflow-hidden mt-3">
          <div
            className="absolute top-0 left-0 h-full bg-blue-700"
            style={{
              width: `${incomePercentage}%`,
              borderRadius: "16px 0 0 16px",
            }} // Atur radius hanya di kiri
          ></div>
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between items-center border-b border-[#EFEFEF] py-2.5">
          <div className="flex flex-row items-center gap-2">
            <span className="h-2.5 w-6 bg-blue-700 rounded-full"></span>
            <p className="text-xs">Pemasukan</p>
          </div>
          <button className="flex flex-row items-center gap-2 rounded-lg">
            <span className="font-domine font-semibold text-sm">
              {formatRupiah(data.total_pemasukan)}
            </span>
          </button>
        </div>
        <div className="flex flex-row justify-between items-center border-b border-[#EFEFEF] py-2.5">
          <div className="flex flex-row items-center gap-2">
            <span className="h-2.5 w-6 bg-amber-500 rounded-full"></span>
            <p className="text-xs">Pengeluaran</p>
          </div>
          <button className="flex flex-row items-center gap-2 rounded-lg">
            <span className="font-domine font-semibold text-sm">
              {formatRupiah(data.total_pengeluaran)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
