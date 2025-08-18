import { useState } from "react";
import { z } from "zod";
import {
  useForm,
  Controller,
  type SubmitHandler,
  useFieldArray,
  useWatch,
} from "react-hook-form";
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
import { Percent, TrashIcon, SlashIcon } from "lucide-react";
import { AddCircleSolidIcon } from "@/assets/icons/solid";
import { GraphIcon, TagIcon } from "@/assets/icons/outline";

import Layout from "@/layouts/layout";
import ModalType from "../../components/modalType";
import { cn } from "@/lib/utils";

const categorySchema = z.object({
  name: z.string().min(1, "Wajib diisi"),
  percentage: z.number().min(1, "Minimal 1%"),
});

const formSchema = z.object({
  name: z.string().nonempty("Nama Perencanaan wajib diisi"),
  portion: z.string().nonempty("Porsi wajib diisi"),
  categories: z.array(categorySchema).min(1, "Minimal 1 kategori"),
});

export default function BudgetFormPage() {
  const [step, setStep] = useState<number>(1);
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      portion: "",
      categories: [{ name: "", percentage: 0 }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });
  const categories = useWatch({ control, name: "categories" }); // ini array of { name, percentage }
  const totalPercentage = categories?.reduce(
    (acc, item) => acc + (Number(item.percentage) || 0),
    0
  );

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    console.log(data);
    // Handle form submission logic here
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
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="flex flex-col px-6 md:px-10 py-8 shadow-[0px_2px_4px_0px_#0000001A] border rounded-3xl bg-white mx-5 mb-5 space-y-10">
        <div className="flex flex-col md:flex-row gap-14 md:gap-10">
          <ModalType />

          <div className="flex flex-col flex-1 space-y-7 pt-4">
            {step === 1 ? (
              <div className="w-full">
                <p className="text-sm">
                  Terdapat dua pilihan yang dapat digunakan, menggunakan
                  persentase dan nominal
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
                <p className="font-semibold text-lg">
                  Persentase saat ini:{" "}
                  <span
                    className={cn(
                      totalPercentage > 100
                        ? "text-red-500"
                        : totalPercentage === 100
                        ? "text-green-500"
                        : "text-black"
                    )}>
                    {totalPercentage}%
                  </span>
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div
                className={
                  cn(step === 2 ? "col-span-2" : "") + " flex flex-col gap-3"
                }>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor=""
                    className="text-sm font-semibold text-zinc-600 uppercase">
                    Nama Perencanaan <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={
                      cn(
                        step === 2
                          ? "cursor-not-allowed bg-gray-200 text-gray-500 border-gray-200"
                          : "border-blue-300"
                      ) +
                      " border rounded-full px-4.5 py-3 flex flex-row items-center"
                    }>
                    <span className="flex bg-inherit">
                      <TagIcon className="size-4 mr-3" color="#3B82F6" />
                    </span>
                    <input
                      autoComplete="off"
                      {...register("name")}
                      type="text"
                      disabled={step === 2}
                      className="outline-none text-sm w-full"
                      placeholder="Nama Perencanaan"
                    />
                  </div>
                </div>
                <span className="text-red-500 text-sm">
                  {errors.name?.message}
                </span>
              </div>
              {step === 1 && (
                <div>
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor=""
                      className="text-sm font-semibold text-zinc-600 uppercase">
                      PORSI (PERSENTASE/NOMINAL){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      control={control}
                      name="portion"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <SelectTrigger className="w-full rounded-full border border-blue-300 px-4.5 py-5.5">
                            <SelectValue placeholder="Pilih porsi" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">
                              Persentase
                            </SelectItem>
                            <SelectItem value="nominal">Nominal</SelectItem>
                            <SelectItem value="hybrid">
                              Hybrid (Persentase & Nominal)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <span className="text-red-500 text-sm">
                    {errors.portion?.message}
                  </span>
                </div>
              )}

              {step === 2 &&
                fields.map((field, index) => (
                  <div className="col-span-2" key={field.id}>
                    <div className="flex gap-3 mt-2">
                      <div className="flex-1 flex flex-col md:flex-row gap-3 items-center">
                        <div className="relative w-full">
                          <label
                            htmlFor=""
                            className="text-sm font-semibold text-zinc-600 uppercase bg-white absolute left-4 top-[-12px] px-2">
                            Nama Kategori{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
                            <button className="flex bg-white">
                              <GraphIcon
                                className="size-4 mr-3"
                                color="#3B82F6"
                              />
                            </button>
                            <input
                              {...register(`categories.${index}.name`)}
                              type="text"
                              className="outline-none text-sm w-full"
                            />
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
                              <Percent
                                className="size-4 mr-3"
                                color="#3B82F6"
                              />
                            </button>
                            <input
                              {...register(`categories.${index}.percentage`, {
                                valueAsNumber: true,
                              })}
                              type="number"
                              className="outline-none text-sm w-full"
                            />
                          </div>
                        </div>
                      </div>

                      <Button
                        disabled={fields.length === 1}
                        onClick={() => remove(index)}
                        size={"icon"}
                        className="rounded-full bg-red-500 hover:bg-red-600 w-10 h-10">
                        <TrashIcon className="size-5 text-white" />
                      </Button>
                    </div>
                  </div>
                ))}

              {step === 2 && (
                <Button
                  onClick={() => append({ name: "", percentage: 0 })}
                  className="col-span-2 rounded-full px-5 py-3 flex flex-row items-center gap-2 border border-amber-400 h-full w-full md:w-auto bg-white text-black hover:bg-gray-100">
                  <AddCircleSolidIcon className="size-5" color="black" />
                  Tambah Kategori
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
          <Button
            type="reset"
            onClick={() => setStep(1)}
            className="bg-white text-indigo-600 flex-1 rounded-full py-3 md:py-5 w-full hover:bg-gray-100 shadow-none">
            {step === 2 ? "Kembali" : "Batal"}
          </Button>
          {step === 1 ? (
            <Button
              onClick={() => setStep(2)}
              disabled={watch("portion") === "" || watch("name") === ""}
              type="button"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-full py-3 md:py-5 w-full">
              Selanjutnya
            </Button>
          ) : (
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-full py-3 md:py-5 w-full">
              Simpan
            </Button>
          )}
        </div>
      </form>
    </Layout>
  );
}
