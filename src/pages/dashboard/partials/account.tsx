import { Button } from "@/components/ui/button";

import { ChevronRightIcon } from "@/assets/icons/outline";

export default function Account() {
  return (
    <div className="shadow-lg rounded-2xl h-full p-5 border flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <p className="font-semibold">Akun</p>

        <Button
          size="icon"
          className="bg-white rounded-full hover:bg-primary/10 p-0">
          <ChevronRightIcon className="w-4 h-4" color="black" />
        </Button>
      </div>

      <div className="mt-5 flex flex-col gap-6 overflow-auto">
        {Array.from({ length: 8 }).map((_, index) => (
          <AccountItem key={index} />
        ))}
        <AccountItem />
      </div>
    </div>
  );
}

const AccountItem = () => {
  return (
    <div className="flex flex-col gap-3.5">
      <p>BNI - Kas</p>
      <div className="flex flex-row justify-between text-2xl font-bold">
        <span>Rp.</span>
        <span>1.000.000</span>
      </div>
      <div>
        <div className="relative w-full h-6 bg-amber-500 rounded-2xl overflow-hidden mt-3">
          <div
            className="absolute top-0 left-0 h-full bg-blue-700"
            style={{ width: "20%", borderRadius: "16px 0 0 16px" }} // Atur radius hanya di kiri
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
              Rp 20.000.000
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
              Rp 180.000.000
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
