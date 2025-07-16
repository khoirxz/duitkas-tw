import { ChevronRightIcon } from "@/assets/icons/outline";
import { Button } from "@/components/ui/button";

export default function DebsBalance() {
  return (
    <div className="shadow-lg rounded-2xl h-full p-5 border flex flex-col justify-between">
      <div className="flex flex-row justify-between items-center">
        <p className="font-semibold">Hutang Piutang</p>

        <Button
          size="icon"
          className="bg-white rounded-full hover:bg-primary/10 p-1">
          <ChevronRightIcon className="w-4 h-4" color="black" />
        </Button>
      </div>

      <div className="relative w-full h-6 bg-blue-100 rounded-2xl overflow-hidden mt-3">
        <div
          className="absolute top-0 left-0 h-full bg-amber-500"
          style={{ width: "20%", borderRadius: "16px 0 0 16px" }} // Atur radius hanya di kiri
        ></div>
      </div>

      <div className="mt-3">
        <div className="flex flex-row justify-between items-center border-t border-[#EFEFEF] py-2.5">
          <div className="flex flex-row items-center gap-2">
            <span className="h-2.5 w-6 bg-amber-500 rounded-full"></span>
            <p className="text-sm">Total Hutang</p>
          </div>
          <button className="flex flex-row items-center gap-2 rounded-lg">
            <span className="font-domine font-bold">Rp 20.000.000</span>
          </button>
        </div>
        <div className="flex flex-row justify-between items-center border-t border-[#EFEFEF] py-2.5">
          <div className="flex flex-row items-center gap-2">
            <span className="h-2.5 w-6 bg-blue-100 rounded-full"></span>
            <p className="text-sm">Total Piutang</p>
          </div>
          <button className="flex flex-row items-center gap-2 rounded-lg">
            <span className="font-domine font-bold">Rp 180.000.000</span>
          </button>
        </div>
      </div>
    </div>
  );
}
