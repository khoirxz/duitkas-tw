import { Button } from "@/components/ui/button";

import { UpSquareIcon, ChevronRightIcon } from "@/assets/icons/outline";
import { GraphSolidIcon, AddSquareSolidIcon } from "@/assets/icons/solid";

export default function ActualBalance() {
  return (
    <div className="bg-blue-700 text-white p-5 rounded-2xl h-full flex flex-col justify-between">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-lg font-semibold">Saldo Aktual</p>
          <span className="bg-green-200 text-green-700 py-1 px-2 rounded-lg font-bold text-sm flex flex-row gap-1 items-center">
            <UpSquareIcon className="w-5 h-5" color="#008236" />
            <span>5 %</span>
          </span>
        </div>

        <p className="text-xl font-semibold">Rp 909.750.000</p>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2">
            <span className="h-2.5 w-6 bg-[#E3F2FD] rounded-full"></span>
            <p>Total Pemasukan</p>
          </div>
          <button className="flex flex-row items-center gap-2 rounded-lg">
            <span className="font-domine text-sm">Rp 10.000.000</span>
            <ChevronRightIcon className="w-4 h-4" color="white" />
          </button>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2">
            <span className="h-2.5 w-6 bg-[#EF9E4D] rounded-full"></span>
            <p>Total Pemasukan</p>
          </div>
          <button className="flex flex-row items-center gap-2 rounded-lg">
            <span className="font-domine text-sm">Rp 190.000.000</span>
            <ChevronRightIcon className="w-4 h-4" color="white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 mt-2 gap-1">
        <Button className="flex-1 rounded-full uppercase flex flex-row items-center justify-between h-auto bg-transparent border-2 border-white">
          <GraphSolidIcon
            style={{
              height: 16,
              width: 16,
            }}
            color="white"
          />
          <span>Perencanaan dana</span>
        </Button>
        <Button className="flex-1 rounded-full uppercase flex flex-row items-center justify-between h-auto border-2 border-green-600 bg-white text-green-600">
          <AddSquareSolidIcon
            style={{
              height: 16,
              width: 16,
            }}
            color="green"
          />
          <span>Tambah Transaksi</span>
        </Button>
      </div>
    </div>
  );
}
