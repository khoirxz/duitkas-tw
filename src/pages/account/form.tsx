import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import TextField from "@/components/textField";
import Layout from "@/layouts/layout";
import { CardIcon, WorkCaseIcon } from "@/assets/icons/outline";
import { Check, ChevronDown, SlashIcon, XIcon } from "lucide-react";
import bcaImg from "@/assets/account/BCA.svg";
import bniImg from "@/assets/account/BNI.svg";
import walletImg from "@/assets/account/wallet-3d.png";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

const bankOptions = [
  { value: "cash", label: "Cash", description: "Kode: 000", img: walletImg },
  {
    value: "bca",
    label: "Bank Central Asia (BCA)",
    description: "Kode: 014",
    img: bcaImg,
  },
  { value: "BNI", label: "Bank BNI", description: "Kode: 008", img: bniImg },
];

export default function AccountFormPage() {
  const [bank, setBank] = useState<string>("");

  return (
    <Layout>
      <div className="w-full p-1 md:p-5 space-y-7">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/account"
                  className="text-blue-700 text-lg">
                  Akun
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/account/form/add" className="text-lg">
                  Tambah Akun
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Alert variant="destructive" className="bg-red-200/50 border-0">
          <AlertDescription className="flex justify-between items-center">
            Gagal Menambahkan Akun, Harap Lengkapi Data Yang Dibutuhkan
            <Button variant="ghost" size="icon">
              <XIcon className="h-4 w-4 text-red-600" />
            </Button>
          </AlertDescription>
        </Alert>

        <form className="rounded-2xl shadow p-6 border space-y-7">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            <div className="col-span-1 md:col-span-6">
              <SelectBank currentValue={bank} onChange={setBank} />
            </div>
            <div className="col-span-1 md:col-span-2">
              <TextField
                label="Atas Nama"
                placeholder="Atas nama Rekening"
                icon={<WorkCaseIcon className="size-5 mr-1" color="#2B63E2" />}
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <TextField
                label="No. Rekening"
                placeholder="No. Rekening bank tertaut"
                icon={<CardIcon className="size-5 mr-1" color="#2B63E2" />}
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <TextField
                type="number"
                label="Biaya Administrasi"
                placeholder="0"
                icon={<span className="text-[#2B63E2]">Rp.</span>}
              />
            </div>
            <div className="col-span-1 md:col-span-3">
              <TextField
                label="Nama Akun"
                placeholder="Contoh: Tabungan"
                icon={<CardIcon className="size-5 mr-1" color="#2B63E2" />}
              />
            </div>
            <div className="col-span-1 md:col-span-3">
              <TextField
                label="Saldo awal"
                placeholder="0"
                type="number"
                icon={<span className="text-[#2B63E2]">Rp.</span>}
              />
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <Checkbox />
            <p className="text-sm">Referensikan sebagai akun utama</p>
          </div>

          <div className="flex gap-3 relative">
            <Button className="flex-1 rounded-full bg-white text-indigo-600 hover:bg-zinc-100">
              Batal
            </Button>
            <Button className="flex-1 rounded-full bg-green-600 hover:bg-green-500">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

interface SelectBankProps {
  currentValue: string;
  onChange: (value: string) => void;
}

function SelectBank({ currentValue, onChange }: SelectBankProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setOpen(false);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2 uppercase">
        Bank Nama
        <span className="text-red-500 ml-1">*</span>
      </label>

      <Button
        type="button"
        variant="outline"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={
          "justify-between px-4 py-3 h-auto rounded-full text-left font-normal border-gray-200 hover:border-gray-300 w-full"
        }>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <WorkCaseIcon className="size-5 ml-2" color="#2B63E2" />

          {currentValue ? (
            (() => {
              const selectedBank = bankOptions.find(
                (bank) => bank.value === currentValue
              );
              return selectedBank ? (
                <div className="flex items-center gap-2">
                  <img
                    src={selectedBank.img}
                    className="w-6 h-6 object-contain"
                  />
                  <span>{selectedBank.label}</span>
                </div>
              ) : (
                <div className="flex flex-col min-w-0 flex-1">Pilih Bank</div>
              );
            })()
          ) : (
            <div className="flex flex-col min-w-0 flex-1">Pilih Bank</div>
          )}
        </div>
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-gray-400" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Cari nama bank disini" />
        <CommandList>
          <CommandEmpty>Bank tidak ditemukan.</CommandEmpty>
          <CommandGroup heading="Daftar Bank">
            {bankOptions.map((bank) => (
              <CommandItem
                key={bank.value}
                onSelect={() => {
                  handleSelect(bank.value);
                }}
                className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <img src={bank.img} className="w-6 h-6 object-contain" />
                  <span>{bank.label}</span>
                </span>
                {currentValue === bank.value && (
                  <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
