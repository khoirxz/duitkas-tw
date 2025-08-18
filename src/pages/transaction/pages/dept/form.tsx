import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router";

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
import {
  BookMarkedIcon,
  CalendarIcon,
  UploadIcon,
  PlusCircleIcon,
  SlashIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import Layout from "@/layouts/layout";
import placeholderImg from "@/assets/transaction/upload-placeholder.png";
import ModalType from "../../components/modalType";
import { useCategory } from "../../hooks/useCategory";
import { useFetchAccount } from "@/pages/account/hooks/useAccount";
import { useCreateTransaction } from "../../hooks/useTransaction";

const formSchema = z.object({
  date: z.string().nonempty("Tanggal TransaksiWajib diisi"),
  date_due: z.string().nonempty("Tanggal Jatuh Tempo wajib diisi"),
  id_category: z.string().nonempty("Kategori wajib diisi"),
  id_account: z.string().nonempty("Pilih akun"),
  amount: z.string().nonempty("Jumlah nominal wajib diisi"),
  note: z.string().optional().nullable(),
  file: z
    .any()
    .transform((val) => (val instanceof FileList ? val[0] : val))
    .refine(
      (file) => {
        // optional -> kalau gak ada file, lolos
        if (!file) return true;

        // Pastikan file adalah File
        if (!(file instanceof File)) return false;

        // Max size 1MB (1 * 1024 * 1024 bytes)
        return file.size <= 1 * 1024 * 1024;
      },
      {
        message: "Ukuran file maksimal 1MB",
      }
    )
    .optional()
    .nullable(),
});

export default function DebtFormPage() {
  const { register, control, handleSubmit } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      date_due: "",
      id_category: "",
      id_account: "",
      amount: "",
      note: "",
      file: null,
    },
  });
  const { pathname } = useLocation();
  const type = pathname.split("/").pop() as "debt" | "credit";

  const { mutate } = useCreateTransaction({
    type: type === "debt" ? "hutang" : "piutang",
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

    if (data.file) {
      formData.append("bukti", data.file); // file
    }

    formData.append("tanggal", data.date); // date
    formData.append("id_kategori", data.id_category); // id_category
    formData.append("id_akun_bank", data.id_account); // id_account
    formData.append("jumlah", data.amount); // amount
    formData.append("keterangan", data.note || ""); // note

    mutate(formData);
    console.log(data);
  };

  return (
    <Layout>
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
        className="flex flex-col px-6 py-8 shadow-[0px_2px_4px_0px_#0000001A] border rounded-3xl bg-white mx-5 mb-5 space-y-10">
        <div className="flex flex-col md:flex-row gap-14 md:gap-10">
          <ModalType />

          <div className="flex flex-col flex-1 space-y-7 pt-4">
            <div className="grid md:grid-cols-2 gap-6">
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
                                date > new Date() ||
                                date < new Date("1900-01-01")
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
              <div className="relative w-full">
                <label
                  htmlFor=""
                  className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
                  tanggal jatuh tempo <span className="text-red-500">*</span>
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
                      name="date_due"
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
                                date > new Date() ||
                                date < new Date("1900-01-01")
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
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative w-full">
                {isLoadingCategory ? (
                  <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
                    <span className="text-sm">Loading...</span>
                  </div>
                ) : (
                  <Controller
                    control={control}
                    name="id_category"
                    render={({ field }) => (
                      <>
                        <label
                          htmlFor="id_category"
                          className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
                          kategori <span className="text-red-500">*</span>
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
                  <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
                    <span className="text-sm">Loading...</span>
                  </div>
                ) : (
                  <Controller
                    control={control}
                    name="id_account"
                    render={({ field }) => (
                      <>
                        <label
                          htmlFor="id_account"
                          className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
                          akun penerima <span className="text-red-500">*</span>
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
              <div className="relative w-full">
                <label
                  htmlFor="amount"
                  className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
                  mitra <span className="text-red-500">*</span>
                </label>
                <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
                  <span className="flex bg-white mr-3 text-sm">Rp.</span>
                  <input
                    {...register("amount", { required: true })}
                    type="number"
                    className="outline-none text-sm w-full"
                    placeholder="Jumlah"
                  />
                </div>
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

            <div className="grid md:grid-cols-2 gap-6">
              <div className="hidden md:flex flex-col gap-3 relative">
                <label
                  htmlFor="file"
                  className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2 z-10 rounded-sm">
                  BUKTI/NOTA <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("file")}
                  type="file"
                  id="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                />
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
                  htmlFor="note"
                  className="text-sm font-semibold text-zinc-600 uppercase">
                  KETERANGAN <span className="text-red-500">*</span>
                </label>
                <div className="relative h-40 pb-3 border border-zinc-300 rounded-2xl pl-12 pr-3">
                  <BookMarkedIcon className="absolute top-3 left-3" />
                  <textarea
                    id="note"
                    {...register("note", { required: true })}
                    className="h-full w-full my-3 outline-none resize-none"
                    placeholder="Jika tidak ada keterangan isikan -"
                  />
                </div>
              </div>
            </div>

            <div className="relative w-full block md:hidden">
              <Button className="bg-transparent border border-yellow-300 flex flex-row justify-center items-center gap-2 text-black w-full rounded-full py-6">
                <PlusCircleIcon className="w-6 h-6 fill-black" color="white" />
                Unggah nota (opsional)
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
          <Button
            type="reset"
            className="bg-white text-indigo-600 flex-1 rounded-full py-3 md:py-5 w-full hover:bg-gray-100">
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
