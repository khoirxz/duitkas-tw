import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  XIcon,
  FilterIcon,
  CalendarIcon,
  WalletIcon,
  TagIcon,
} from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { TextField } from "./textField";
import { Button as SButton } from "./ui/button";

interface ModalFilterProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function FilterModal({ open, setOpen }: ModalFilterProps) {
  const [tabs, setTabs] = useState(0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="p-0 bg-transparent border-0 gap-0 sm:max-w-2xl"
        showCloseButton={false}>
        <DialogHeader className="bg-blue-500 py-2 px-5 rounded-t-2xl">
          <DialogTitle className="text-white text-sm font-normal my-2 font-public justify-between flex items-center">
            Filter Penampilan Transaksi
            <button
              className="text-white p-1 cursor-pointer"
              onClick={() => setOpen(false)}>
              <XIcon className="h-4 w-4" />
            </button>
          </DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              Ganti tipe perencanaan dana yang akan dibuat.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="bg-white p-5 space-y-5 font-public relative overflow-auto md:overflow-hidden">
          <div className="flex flex-nowrap justify-start gap-3 w-2xl">
            <Button
              title="Rentan Waktu"
              tabs={tabs}
              setTabs={setTabs}
              number={1}
            />
            <Button title="Harian" tabs={tabs} setTabs={setTabs} number={2} />
            <Button title="Bulanan" tabs={tabs} setTabs={setTabs} number={3} />
            <Button title="Tahunan" tabs={tabs} setTabs={setTabs} number={4} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 bg-white p-5">
          {tabs === 1 ? (
            <InputTime />
          ) : tabs === 2 ? (
            <InputDaily />
          ) : tabs === 3 ? (
            <InputMonthly />
          ) : tabs === 4 ? (
            <InputYears />
          ) : null}

          <div className="col-span-2 md:col-span-1">
            <TextField
              label="Akun yang digunakan"
              placeholder="Atas nama Rekening"
              icon={<WalletIcon className="size-4 text-primary" />}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <TextField
              label="Jenis Transaksi"
              placeholder="Jenis Transaksi"
              icon={<TagIcon className="size-4 text-primary" />}
            />
          </div>

          <div className="col-span-2">
            <TextField
              label="Kategori"
              placeholder="Katrgori"
              icon={<TagIcon className="size-4 text-primary" />}
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <TextField
              label="Nominal Minimum"
              placeholder="0"
              icon={
                <span className="text-sm font-semibold text-primary">Rp.</span>
              }
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <TextField
              label="Nominal Maksimum"
              placeholder="0"
              icon={
                <span className="text-sm font-semibold text-primary">Rp.</span>
              }
            />
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-end items-center bg-blue-200 py-2 px-5 rounded-b-2xl">
          <SButton
            className="rounded-full px-10 bg-transparent text-indigo-600"
            onClick={() => setOpen(false)}>
            Batal
          </SButton>
          <SButton className="rounded-full w-30 py-5 bg-blue-700 text-white">
            <FilterIcon className="size-4 mr-1" />
            Filter
          </SButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  tabs: number;
  setTabs: React.Dispatch<React.SetStateAction<number>>;
  number: number;
}

function Button({ title, tabs, setTabs, number, ...props }: ButtonProps) {
  const handleTabs = (index: number) => {
    if (index === tabs) {
      setTabs(0);
      return;
    }
    setTabs(index);
  };

  return (
    <button
      onClick={() => handleTabs(number)}
      className={`${
        tabs === number ? "bg-blue-500 text-white" : ""
      } rounded-full uppercase font-semibold border-2 border-blue-500 text-sm py-2 w-[150px] text-center`}
      {...props}>
      {title}
    </button>
  );
}

function InputTime() {
  return (
    <>
      <div className="col-span-2 md:col-span-1">
        <TextField
          label="Tanggal Awal"
          placeholder="Tanggal Awal"
          icon={<CalendarIcon className="size-4 text-primary" />}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <TextField
          label="Tanggal Akhir"
          placeholder="Tanggal Akhir"
          icon={<CalendarIcon className="size-4 text-primary" />}
        />
      </div>
    </>
  );
}

function InputDaily() {
  return (
    <div className="col-span-2">
      <TextField
        label="Tanggal"
        placeholder="Tanggal"
        icon={<CalendarIcon className="size-4 text-primary" />}
      />
    </div>
  );
}

function InputMonthly() {
  return (
    <>
      <div className="col-span-2 md:col-span-1">
        <TextField
          label="Bulan"
          placeholder="Bulan"
          icon={<CalendarIcon className="size-4 text-primary" />}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <TextField
          label="Tahun"
          placeholder="Tahun"
          icon={<CalendarIcon className="size-4 text-primary" />}
        />
      </div>
    </>
  );
}

function InputYears() {
  return (
    <div className="col-span-2">
      <TextField
        label="Tahun"
        placeholder="Tahun"
        icon={<CalendarIcon className="size-4 text-primary" />}
      />
    </div>
  );
}
