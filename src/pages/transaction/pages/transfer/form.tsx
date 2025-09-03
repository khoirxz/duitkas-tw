import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BookMarkedIcon, CalendarIcon, SlashIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import Layout from "@/layouts/layout";

import ModalType from "../../components/modalType";
import { useCategory } from "../../hooks/useCategory";
import { useCreateTransaction } from "../../hooks/useTransaction";
import { useFetchAccount } from "@/pages/account/hooks/useAccount";
import { FormErrorSummary } from "@/components/FormErrorSummary";

const formSchema = z.object({
  date: z.string().nonempty("Tanggal TransaksiWajib diisi"),
  id_bank_sender: z.string().nonempty("Kategori wajib diisi"),
  id_bank_receiver: z.string().nonempty("Pilih akun"),
  amount: z.string().nonempty("Jumlah nominal wajib diisi"),
  tax: z.string().nonempty("Jumlah pajak wajib diisi"),
  note: z.string().optional().nullable(),
});

export default function TransferFormPage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      id_bank_sender: "",
      id_bank_receiver: "",
      amount: "",
      note: "",
      tax: "",
    },
  });

  const { mutate } = useCreateTransaction({
    type: "bank/tambah-transaksi",
  });
  const { data: category, isLoading: isLoadingCategory } = useCategory({
    type: "pemasukan",
  });
  const { data: account, isLoading: isLoadingAccount } = useFetchAccount(
    "",
    1,
    10
  );

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    formData.append("tanggal", data.date); // date
    formData.append("id_bank_asal", data.id_bank_sender); // id_bank_sender
    formData.append("id_bank_tujuan", data.id_bank_receiver); // id_bank_receiver
    formData.append("jumlah", data.amount); // amount
    formData.append("pajak", data.tax); // tax
    formData.append("keterangan", data.note || ""); // note

    mutate(formData);
    console.log(data);
  };

  return (
    <Layout>
      <FormErrorSummary errors={errors} firstOnly />
      <div className="w-full p-3 md:p-5 space-y-7">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin/transaction"
                  className="text-blue-700 text-lg">
                  <h1 className="font-semibold text-lg">Data Transaksi</h1>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-lg">
                  <h1 className="font-semibold text-lg">Tambah Data</h1>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-12 py-8 shadow-[0px_2px_4px_0px_#0000001A] border rounded-3xl bg-white mx-5 mb-5 space-y-10">
        <div className="flex flex-col md:flex-row gap-14 md:gap-10">
          <ModalType />

          <div className="flex flex-col flex-1 space-y-7 pt-4">
            <div className="relative w-full">
              <label
                htmlFor=""
                className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
                tanggal transaksi <span className="text-red-500">*</span>
              </label>

              <Popover>
                <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
                  <PopoverTrigger asChild>
                    <button className="flex bg-white">
                      <CalendarIcon className="size-4 mr-3" color="#3B82F6" />
                    </button>
                  </PopoverTrigger>
                  <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                      <>
                        <span className="text-sm">
                          {field.value
                            ? new Intl.DateTimeFormat("id-ID", {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                              }).format(new Date(field.value))
                            : "Pilih Tanggal"}
                        </span>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(date ? date.toISOString() : "")
                            }
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </>
                    )}
                  />
                </div>
              </Popover>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative w-full">
                {isLoadingCategory ? (
                  <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center bg-blue-300 animate-pulse h-12"></div>
                ) : (
                  <Controller
                    control={control}
                    name="id_bank_sender"
                    render={({ field }) => (
                      <>
                        <label
                          htmlFor="id_bank_sender"
                          className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
                          akun asal <span className="text-red-500">*</span>
                        </label>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <SelectTrigger className="w-full rounded-full border border-blue-300 px-4.5 py-5.5">
                            <SelectValue placeholder="Pilih Kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            {category?.data.kategori.map((item) => (
                              <SelectItem
                                value={item.id_kategori}
                                key={item.id_kategori}>
                                {item.nama_kategori}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  />
                )}
              </div>
              <div className="relative w-full">
                {isLoadingAccount ? (
                  <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center bg-blue-300 animate-pulse h-12"></div>
                ) : (
                  <Controller
                    control={control}
                    name="id_bank_receiver"
                    render={({ field }) => (
                      <>
                        <label
                          htmlFor="id_bank_receiver"
                          className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
                          akun tujuan <span className="text-red-500">*</span>
                        </label>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <SelectTrigger className="w-full rounded-full border border-blue-300 px-4.5 py-5.5">
                            <SelectValue placeholder="Pilih akun" />
                          </SelectTrigger>
                          <SelectContent>
                            {account?.data.akun.map((item) => (
                              <SelectItem
                                value={item.id_akun_bank.toString()}
                                key={item.id_akun_bank}>
                                {item.nama_akun}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  />
                )}
              </div>
            </div>

            <div className="relative w-full">
              <label
                htmlFor="amount"
                className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
                Jumlah <span className="text-red-500">*</span>
              </label>
              <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
                <span className="flex bg-white mr-3 text-sm text-blue-500">
                  Rp.
                </span>
                <input
                  {...register("amount", { required: true })}
                  type="number"
                  className="outline-none text-sm w-full"
                  placeholder="Jumlah"
                />
              </div>
            </div>

            <div className="relative w-full">
              <label
                htmlFor="text"
                className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
                Biaya transfer <span className="text-red-500">*</span>
              </label>
              <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
                <span className="flex bg-white mr-3 text-sm text-blue-500">
                  Rp.
                </span>
                <input
                  id="tax"
                  {...register("tax", { required: true })}
                  type="number"
                  className="outline-none text-sm w-full"
                  placeholder="Jumlah"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="note"
                  className="text-sm font-semibold text-zinc-600 uppercase">
                  KETERANGAN <span className="text-red-500">*</span>
                </label>
                <div className="relative h-40 pb-3 border border-zinc-300 rounded-xl pl-12 pr-3">
                  <BookMarkedIcon className="absolute top-3 left-3.5 size-5" />
                  <textarea
                    id="note"
                    {...register("note", { required: true })}
                    className="h-full w-full my-3 outline-none resize-none"
                    placeholder="Jika tidak ada keterangan isikan -"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
          <Button
            type="reset"
            className="bg-white text-indigo-600 flex-1 rounded-full py-3 md:py-5 w-full hover:bg-gray-100 shadow-none">
            Batal
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-full py-3 md:py-5 w-full">
            Simpan
          </Button>
        </div>
      </form>
    </Layout>
  );
}
