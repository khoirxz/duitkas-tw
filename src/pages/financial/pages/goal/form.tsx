import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Layout from "@/layouts/layout";
import { SlashIcon, TagIcon } from "lucide-react";
import ModalType from "../../components/modalType";

const formSchema = z.object({
  name: z.string().nonempty("Nama Perencanaan wajib diisi"),
  nominal: z.number().min(1, "Nominal Perencanaan harus lebih dari 0"),
});

export default function GoalFormPage() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    console.log("Form submitted with data:", data);
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
        className="flex flex-col px-6 md:px-10 py-8 shadow-[0px_2px_4px_0px_#0000001A] border rounded-3xl bg-white mx-5 mb-5 space-y-10">
        <div className="flex flex-col md:flex-row gap-14 md:gap-10">
          <ModalType />

          <div className="flex flex-col flex-1 space-y-7 pt-4">
            <div className="w-full">
              <p className="text-sm">
                Tentukan goals yang ingin dicapai beserta besaran nominal
              </p>
              <p className="font-semibold text-lg">
                Silahkan melengkapi data perencanaan untuk melanjutkan
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor=""
                  className="text-sm font-semibold text-zinc-600 uppercase">
                  NAMA PERENCANAAN <span className="text-red-500">*</span>
                </label>
                <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
                  <button className="flex bg-white">
                    <TagIcon className="size-4 mr-3" color="#3B82F6" />
                  </button>
                  <input
                    {...register("name")}
                    type="text"
                    className="outline-none text-sm w-full"
                    placeholder="Nama Perencanaan"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor=""
                  className="text-sm font-semibold text-zinc-600 uppercase">
                  NOMINAL PERENCANAAN <span className="text-red-500">*</span>
                </label>
                <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
                  <button className="flex bg-white">
                    <span className="text-sm font-semibold text-blue-500 mr-2">
                      Rp.
                    </span>
                  </button>
                  <input
                    {...register("nominal", { valueAsNumber: true })}
                    type="number"
                    className="outline-none text-sm w-full"
                    placeholder="Nominal Perencanaan"
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
