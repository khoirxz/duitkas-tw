import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookMarkedIcon, CalendarIcon } from "lucide-react";

export default function TransferForm() {
  return (
    <div className="flex flex-col flex-1 space-y-6 pt-4">
      <div className="relative w-full">
        <label
          htmlFor=""
          className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
          tanggal transaksi <span className="text-red-500">*</span>
        </label>
        <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
          <button className="flex bg-white">
            <CalendarIcon className="size-4 mr-3" color="#3B82F6" />
          </button>
          <input
            type="text"
            className="outline-none text-sm"
            placeholder="Pilih porsi"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative w-full">
          <label
            htmlFor=""
            className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
            akun asal <span className="text-red-500">*</span>
          </label>
          <Select>
            <SelectTrigger className="w-full rounded-full border border-blue-300 px-4.5 py-5.5">
              <SelectValue placeholder="Pilih porsi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="presentase">Persentase</SelectItem>
              <SelectItem value="nominal">Nominal</SelectItem>
              <SelectItem value="hybrid">
                Hybrid (Persentase & Nominal)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative w-full">
          <label
            htmlFor=""
            className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
            akun tujuan <span className="text-red-500">*</span>
          </label>
          <Select>
            <SelectTrigger className="w-full rounded-full border border-blue-300 px-4.5 py-5.5">
              <SelectValue placeholder="Pilih porsi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="presentase">Persentase</SelectItem>
              <SelectItem value="nominal">Nominal</SelectItem>
              <SelectItem value="hybrid">
                Hybrid (Persentase & Nominal)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative w-full">
        <label
          htmlFor=""
          className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
          jumlah <span className="text-red-500">*</span>
        </label>
        <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
          <button className="flex bg-white">
            <CalendarIcon className="size-4 mr-3" color="#3B82F6" />
          </button>
          <input
            type="text"
            className="outline-none text-sm"
            placeholder="Pilih porsi"
          />
        </div>
      </div>
      <div className="relative w-full">
        <label
          htmlFor=""
          className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
          biaya transfer <span className="text-red-500">*</span>
        </label>
        <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
          <button className="flex bg-white">
            <CalendarIcon className="size-4 mr-3" color="#3B82F6" />
          </button>
          <input
            type="text"
            className="outline-none text-sm"
            placeholder="Pilih porsi"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label
          htmlFor=""
          className="text-sm font-semibold text-zinc-600 uppercase">
          KETERANGAN <span className="text-red-500">*</span>
        </label>
        <div className="relative border border-zinc-300 rounded-2xl pl-12 pr-3">
          <BookMarkedIcon className="absolute top-3 left-3" />
          <textarea
            className="h-40 w-full pt-3 outline-none"
            placeholder="Jika tidak ada keterangan isikan -"
          />
        </div>
      </div>
    </div>
  );
}
