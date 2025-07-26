import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookMarkedIcon, CalendarIcon, UploadIcon } from "lucide-react";

import placeholderImg from "@/assets/transaction/upload-placeholder.png";

interface CashFlowFormProps {
  type: "income" | "expense";
}

export default function CashFlowForm({ type }: CashFlowFormProps) {
  console.log("CashFlowForm type:", type);

  return (
    <div className="flex flex-col flex-1 space-y-7 pt-4">
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

      <div className="grid md:grid-cols-3 gap-6">
        <div className="relative w-full">
          <label
            htmlFor=""
            className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
            kategori <span className="text-red-500">*</span>
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
            akun digunakan <span className="text-red-500">*</span>
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
            jumlah <span className="text-red-500">*</span>
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

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3 relative">
          <label
            htmlFor=""
            className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2 z-10 rounded-sm">
            BUKTI/NOTA <span className="text-red-500">*</span>
          </label>
          <div className="relative flex-1 h-full text-white">
            <div className="w-full h-48 relative">
              <img
                src={placeholderImg}
                alt="Placeholder"
                className="w-full h-full object-cover rounded-lg object-top"
              />
              <div className="absolute inset-0 bg-black opacity-75 rounded-lg"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center gap-2">
              <UploadIcon />
              <p className="text-sm font-semibold">
                Klik untuk memilih file yang akan diunggah
              </p>
              <p className="text-xs text-zinc-400">
                Maksimal ukuran 1MB (*.png, *.jpg, *.jpeg)
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label
            htmlFor=""
            className="text-sm font-semibold text-zinc-600 uppercase">
            KETERANGAN <span className="text-red-500">*</span>
          </label>
          <div className="relative h-40 pb-3 border border-zinc-300 rounded-2xl pl-12 pr-3">
            <BookMarkedIcon className="absolute top-3 left-3" />
            <textarea
              className="h-full w-full my-3 outline-none resize-none"
              placeholder="Jika tidak ada keterangan isikan -"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
