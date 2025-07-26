import { GraphIcon, TagIcon } from "@/assets/icons/outline";
import { AddCircleSolidIcon } from "@/assets/icons/solid";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Percent, TrashIcon } from "lucide-react";

interface FormBudgetPageProps {
  step: number;
}

const FormBudgetPage: React.FC<FormBudgetPageProps> = ({ step }) => {
  return (
    <div className="flex-1 flex flex-col gap-10 mt-10">
      {step === 1 ? (
        <div className="w-full">
          <p className="text-sm">
            Terdapat dua pilihan yang dapat digunakan, menggunakan persentase
            dan nominal
          </p>
          <p className="font-semibold text-lg">
            Silahkan pilih porsi yang akan digunakan
          </p>
        </div>
      ) : (
        <div className="w-full">
          <p className="text-sm">
            Pastikan persentase mencapai 100% untuk melanjutkan
          </p>
          <p className="font-semibold text-lg">Persentase saat ini: 100%</p>
        </div>
      )}

      {step === 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-3">
            <label
              htmlFor=""
              className="text-sm font-semibold text-zinc-600 uppercase">
              Nama Perencanaan <span className="text-red-500">*</span>
            </label>
            <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
              <button className="flex bg-white">
                <TagIcon className="size-4 mr-3" color="#3B82F6" />
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
              PORSI (PERSENTASE/NOMINAL) <span className="text-red-500">*</span>
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
      ) : (
        <FormBudgetAdvanced />
      )}
    </div>
  );
};

const FormBudgetAdvanced = () => {
  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="flex flex-col gap-3">
        <div className="relative w-full">
          <label
            htmlFor=""
            className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
            Nama Perencanaan <span className="text-red-500">*</span>
          </label>
          <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
            <button className="flex bg-white">
              <TagIcon className="size-4 mr-3" color="#3B82F6" />
            </button>
            <input
              type="text"
              className="outline-none text-sm"
              placeholder="Pilih porsi"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Form */}
      <div className="flex flex-row gap-3 items-center mt-2">
        <div className="relative w-full">
          <label
            htmlFor=""
            className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
            Nama Kategori <span className="text-red-500">*</span>
          </label>
          <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
            <button className="flex bg-white">
              <GraphIcon className="size-4 mr-3" color="#3B82F6" />
            </button>
            <input type="text" className="outline-none text-sm" />
          </div>
        </div>
        <div className="relative w-full">
          <label
            htmlFor=""
            className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
            Presentase <span className="text-red-500">*</span>
          </label>
          <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
            <button className="flex bg-white">
              <Percent className="size-4 mr-3" color="#3B82F6" />
            </button>
            <input type="text" className="outline-none text-sm" />
          </div>
        </div>
        <Button
          size={"icon"}
          className="rounded-full bg-red-500 hover:bg-red-600 w-10 h-10">
          <TrashIcon className="size-5 text-white" />
        </Button>
      </div>
      <Button className="rounded-full px-5 py-3 flex flex-row items-center gap-2 border border-amber-400 h-full w-full md:w-auto bg-white text-black hover:bg-gray-100">
        <AddCircleSolidIcon className="size-5" color="black" />
        Tambah Kategori
      </Button>
    </div>
  );
};

export default FormBudgetPage;
