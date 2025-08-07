import { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { Link, useParams } from "react-router";

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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ChevronDown, SlashIcon, XIcon } from "lucide-react";

import Layout from "@/layouts/layout";
import { CardIcon, WorkCaseIcon } from "@/assets/icons/outline";
import {
  useBanks,
  useCreateAccount,
  useUpdateAccount,
} from "./hooks/useAccount";
import type { ResponseProps } from "@/types/response";

const formSchema = z.object({
  id_bank: z.string().min(1, { message: "Bank harus diisi" }),
  number_account: z.string().min(1, { message: "Nomor rekening harus diisi" }),
  name_account: z.string().min(1, { message: "Nama rekening harus diisi" }),
  on_behalf: z.string().min(1, { message: "Pemilik rekening harus diisi" }),
  admin: z.string().min(1, { message: "Admin harus diisi" }),
  amount: z.string().min(1, { message: "Saldo awal harus diisi" }),
});

export default function AccountFormPage() {
  const { id } = useParams();
  const {
    mutate: postAccount,
    isSuccess: postSuccess,
    isError: postError,
  } = useCreateAccount();
  const { mutate: updateAccount } = useUpdateAccount();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_bank: "",
      number_account: "",
      name_account: "",
      on_behalf: "",
      admin: "",
      amount: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();

      if (id) {
        formData.append("id_akun_bank", id); // id_akun_bank
      }

      formData.append("id_bank", data.id_bank); // id_bank
      formData.append("nomor_rekening", data.number_account); // number_account
      formData.append("nama_akun", data.name_account); // name_account
      formData.append("atas_nama", data.on_behalf); // on_behalf
      formData.append("administrasi", data.admin); // admin
      formData.append("saldo_awal", data.amount); // amount

      if (id) {
        updateAccount(formData);
      } else {
        postAccount(formData);
      }
    } catch (e) {
      const error = e as AxiosError;
      interface ErrResponseProps extends ResponseProps {
        data: null;
      }
      const errorData = error.response?.data as ErrResponseProps | undefined;

      if (errorData) {
        alert(errorData.message);
      }
    }
  };

  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-blue-700 text-lg font-semibold"
                  asChild>
                  <Link to="/admin/account">Akun</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-lg font-semibold">
                  {id ? "Edit Akun" : "Tambah Akun"}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {postSuccess && (
          <Alert variant="destructive" className="bg-green-200/50 border-0">
            <AlertDescription className="flex justify-between items-center">
              Berhasil Menambahkan Akun
              <Button variant="ghost" size="icon">
                <Check className="h-4 w-4 text-green-600" />
              </Button>
            </AlertDescription>
          </Alert>
        )}
        {postError && (
          <Alert variant="destructive" className="bg-red-200/50 border-0">
            <AlertDescription className="flex justify-between items-center">
              Gagal Menambahkan Akun, Harap Lengkapi Data Yang Dibutuhkan
              <Button variant="ghost" size="icon">
                <XIcon className="h-4 w-4 text-red-600" />
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl shadow p-6 border space-y-7">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            <div className="col-span-1 md:col-span-6">
              <Controller
                control={control}
                name="id_bank"
                render={({ field }) => (
                  <SelectBank
                    currentValue={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              {errors.id_bank && (
                <span className="text-red-600 text-xs">
                  {errors.id_bank.message}
                </span>
              )}
            </div>
            <div className="col-span-1 md:col-span-2 space-y-1">
              <TextField
                {...register("on_behalf")}
                label="Atas Nama"
                placeholder="Atas nama Rekening"
                icon={<WorkCaseIcon className="size-5 mr-1" color="#2B63E2" />}
              />
              {errors.on_behalf && (
                <span className="text-red-600 text-xs">
                  {errors.on_behalf.message}
                </span>
              )}
            </div>
            <div className="col-span-1 md:col-span-2 space-y-1">
              <TextField
                {...register("number_account")}
                label="No. Rekening"
                placeholder="No. Rekening bank tertaut"
                icon={<CardIcon className="size-5 mr-1" color="#2B63E2" />}
              />
              {errors.number_account && (
                <span className="text-red-600 text-xs">
                  {errors.number_account.message}
                </span>
              )}
            </div>
            <div className="col-span-1 md:col-span-2 space-y-1">
              <TextField
                {...register("admin")}
                type="number"
                label="Biaya Administrasi"
                placeholder="0"
                icon={<span className="text-[#2B63E2]">Rp.</span>}
              />
              {errors.admin && (
                <span className="text-red-600 text-xs">
                  {errors.admin.message}
                </span>
              )}
            </div>
            <div className="col-span-1 md:col-span-3 space-y-1">
              <TextField
                {...register("name_account")}
                label="Nama Akun"
                placeholder="Contoh: Tabungan"
                icon={<CardIcon className="size-5 mr-1" color="#2B63E2" />}
              />
              {errors.name_account && (
                <span className="text-red-600 text-xs">
                  {errors.name_account.message}
                </span>
              )}
            </div>
            <div className="col-span-1 md:col-span-3 space-y-1">
              <TextField
                {...register("amount")}
                label="Saldo awal"
                placeholder="0"
                type="number"
                icon={<span className="text-[#2B63E2]">Rp.</span>}
              />
              {errors.amount && (
                <span className="text-red-600 text-xs">
                  {errors.amount.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <Checkbox />
            <p className="text-sm">Referensikan sebagai akun utama</p>
          </div>

          <div className="flex gap-3 relative">
            <Button
              type="button"
              className="flex-1 rounded-full bg-white text-indigo-600 hover:bg-zinc-100">
              Batal
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-full bg-green-600 hover:bg-green-500">
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
  const { data: bankOptions } = useBanks();

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
          "justify-between px-4 py-3 h-10 rounded-full text-left font-normal border-gray-200 hover:border-gray-300 w-full"
        }>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <WorkCaseIcon className="size-5 ml-2" color="#2B63E2" />

          {currentValue ? (
            (() => {
              const selectedBank = bankOptions?.data.bank.find(
                (bank) => bank.id_bank === currentValue
              );
              return selectedBank ? (
                <div className="flex items-center gap-2">
                  <img
                    src={selectedBank.logo}
                    className="w-6 h-6 object-contain"
                  />
                  <span>{selectedBank.nama_bank}</span>
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
            {bankOptions?.data.bank.map((bank) => (
              <CommandItem
                key={bank.id_bank}
                onSelect={() => {
                  handleSelect(bank.id_bank);
                }}
                className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <img src={bank.logo} className="w-6 h-6 object-contain" />
                  <span>{bank.nama_bank}</span>
                </span>
                {currentValue === bank.id_bank && (
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
