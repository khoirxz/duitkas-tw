import { Button } from "@/components/ui/button";

import { UpSquareIcon, ChevronRightIcon } from "@/assets/icons/outline";
import { GraphSolidIcon, AddSquareSolidIcon } from "@/assets/icons/solid";
import { formatRupiah } from "@/lib/formatMoney";

interface ActualBalanceProps {
  data: {
    pemasukan_bulan_ini: number;
    pengeluaran_bulan_ini: number;
    prosentase: number;
  };
}

export default function ActualBalance({ data }: ActualBalanceProps) {
  return (
    <div className="bg-blue-700 text-white p-5 rounded-2xl h-full flex flex-col justify-between">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <div className="flex flex-row gap-2 items-center justify-between md:justify-start">
          <p className=" md:text-lg font-semibold">Saldo Aktual</p>
          <span className="bg-green-200 text-green-700 py-1 px-2 rounded-lg font-bold text-sm flex flex-row gap-1 items-center">
            <UpSquareIcon className="w-4 h-4 md:w-5 md:h-5" color="#008236" />
            <span className="text-xs md:text-sm">5 %</span>
          </span>
        </div>

        <p className="text-2xl font-semibold">Rp 909.750.000</p>
      </div>

      <div className="flex flex-col gap-2 mt-4 text-sm md:text-base">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2">
            <span className="h-2.5 w-6 bg-[#E3F2FD] rounded-full"></span>
            <p>Total Pemasukan</p>
          </div>
          <button className="flex flex-row items-center gap-2 rounded-lg">
            <span className="font-domine text-sm">
              {formatRupiah(data.pemasukan_bulan_ini)}
            </span>
            <ChevronRightIcon className="w-4 h-4" color="white" />
          </button>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2">
            <span className="h-2.5 w-6 bg-[#EF9E4D] rounded-full"></span>
            <p>Total Pengeluaran</p>
          </div>
          <button className="flex flex-row items-center gap-2 rounded-lg">
            <span className="font-domine text-sm">
              {formatRupiah(data.pengeluaran_bulan_ini)}
            </span>
            <ChevronRightIcon className="w-4 h-4" color="white" />
          </button>
        </div>
      </div>

      <div className="grid grud-cols-1 md:grid-cols-2 mt-5 md:mt-2 gap-1">
        <Button className="flex-1 rounded-full uppercase flex flex-row items-center md:justify-between h-auto bg-transparent border-2 border-white">
          <GraphSolidIcon
            style={{
              height: 16,
              width: 16,
            }}
            color="white"
          />
          <span>Perencanaan dana</span>
        </Button>
        <Button className="flex-1 rounded-full uppercase flex flex-row items-center md:justify-between h-auto border-2 border-green-600 bg-green-600 text-white">
          <AddSquareSolidIcon
            style={{
              height: 16,
              width: 16,
            }}
            color="white"
          />
          <span>Tambah Transaksi</span>
        </Button>
      </div>
    </div>
  );
}
