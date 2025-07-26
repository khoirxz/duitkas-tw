import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { XIcon, FilterIcon } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import TextField from "./textField";
import { WorkCaseIcon } from "@/assets/icons/outline";
import { Button as SButton } from "./ui/button";

interface ModalFilterProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function FilterModal({ open, setOpen }: ModalFilterProps) {
  const [tabs, setTabs] = useState(0);

  const handleTabs = (index: number) => setTabs(index);

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
        <div className="bg-white p-5 space-y-5 font-public">
          <div className="grid grid-cols-4 gap-2">
            <Button title="Rentan Waktu" onClick={() => handleTabs(1)} />
            <Button title="Harian" onClick={() => handleTabs(2)} />
            <Button title="Bulanan" onClick={() => handleTabs(3)} />
            <Button title="Tahunan" onClick={() => handleTabs(4)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {tabs === 1 ? (
              <InputTime />
            ) : tabs === 2 ? (
              <InputDaily />
            ) : tabs === 3 ? (
              <InputMonthly />
            ) : tabs === 4 ? (
              <InputYears />
            ) : null}
            <div className="col-span-1">
              <TextField
                label="Atas Nama"
                placeholder="Atas nama Rekening"
                icon={<WorkCaseIcon className="size-5 mr-1" color="#2B63E2" />}
              />
            </div>
            <div className="col-span-1">
              <TextField
                label="Atas Nama"
                placeholder="Atas nama Rekening"
                icon={<WorkCaseIcon className="size-5 mr-1" color="#2B63E2" />}
              />
            </div>
            <div className="col-span-2">
              <TextField
                label="Atas Nama"
                placeholder="Atas nama Rekening"
                icon={<WorkCaseIcon className="size-5 mr-1" color="#2B63E2" />}
              />
            </div>
            <div className="col-span-1">
              <TextField
                label="Atas Nama"
                placeholder="Atas nama Rekening"
                icon={<WorkCaseIcon className="size-5 mr-1" color="#2B63E2" />}
              />
            </div>
            <div className="col-span-1">
              <TextField
                label="Atas Nama"
                placeholder="Atas nama Rekening"
                icon={<WorkCaseIcon className="size-5 mr-1" color="#2B63E2" />}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-end items-center bg-blue-200 py-2 px-5 rounded-b-2xl">
          <SButton className="rounded-full px-10 bg-transparent text-indigo-600">
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
}

function Button({ title, ...props }: ButtonProps) {
  return (
    <button
      className="bg-white rounded-full uppercase font-semibold border-2 border-blue-500 text-sm py-2"
      {...props}>
      {title}
    </button>
  );
}

function InputTime() {
  return (
    <>
      <div className="col-span-1">
        <TextField
          label="Atas Nama"
          placeholder="Atas nama Rekening"
          icon={<WorkCaseIcon className="size-5 mr-1" color="#2B63E2" />}
        />
      </div>
      <div className="col-span-1">
        <TextField
          label="Atas Nama"
          placeholder="Atas nama Rekening"
          icon={<WorkCaseIcon className="size-5 mr-1" color="#2B63E2" />}
        />
      </div>
    </>
  );
}

function InputDaily() {
  return (
    <>
      <div className="col-span-1">
        <TextField
          label="Atas Nama"
          placeholder="Atas nama Rekening"
          icon={<WorkCaseIcon className="size-5 mr-1" color="#2B63E2" />}
        />
      </div>
      <div className="col-span-1">
        <TextField
          label="Atas Nama"
          placeholder="Atas nama Rekening"
          icon={<WorkCaseIcon className="size-5 mr-1" color="#2B63E2" />}
        />
      </div>
    </>
  );
}

function InputMonthly() {
  return (
    <div className="col-span-1">
      <TextField
        label="Atas Nama"
        placeholder="Atas nama Rekening"
        icon={<WorkCaseIcon className="size-5 mr-1" color="#2B63E2" />}
      />
    </div>
  );
}

function InputYears() {
  return (
    <div className="col-span-1">
      <TextField
        label="Atas Nama"
        placeholder="Atas nama Rekening"
        icon={<WorkCaseIcon className="size-5 mr-1" color="#2B63E2" />}
      />
    </div>
  );
}
