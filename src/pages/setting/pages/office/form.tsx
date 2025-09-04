import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TextField } from "@/components/textField";
import { SlashIcon } from "lucide-react";

import Layout from "@/layouts/layout";
import {
  useCreateOfficeSettings,
  useUpdateOfficeSettings,
  useFetchOfficeDetailSettings,
} from "../../hooks/useOffice";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Nama kantor tidak boleh kosong"),
  code: z.string().min(1, "Kode tidak boleh kosong"),
  type: z.string().min(1, "Tipe tidak boleh kosong"),
});

export default function SettingOfficeFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
  });
  const { data: detailData } = useFetchOfficeDetailSettings(id!);
  const { mutate: createOffice } = useCreateOfficeSettings({
    onSuccess: () => {
      // Handle success (e.g., show a success message or redirect)
      navigate("/admin/settings/users/", {
        replace: true,
        state: { refresh: true },
      });
    },
    onError: (error) => {
      // Handle error (e.g., show an error message)
      console.error(error);
    },
  });
  const { mutate: updateOffice } = useUpdateOfficeSettings({
    onSuccess: () => {
      // Handle success (e.g., show a success message or redirect)
      navigate("/admin/settings/users/", {
        replace: true,
        state: { refresh: true },
      });
    },
    onError: (error) => {
      // Handle error (e.g., show an error message)
      console.error(error);
    },
  });

  useEffect(() => {
    if (detailData) {
      reset({
        name: detailData.data?.nama || "",
        code: detailData.data?.kode || "",
        type: detailData.data?.tipe || "",
      });
    }
  }, [detailData, reset]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("nama", data.name);
    formData.append("kode", data.code);
    formData.append("tipe", data.type);

    if (id) {
      formData.append("id_kantor", id);
      updateOffice(formData);
    } else {
      createOffice(formData);
    }
  };

  return (
    <Layout>
      <div className="w-full p-3 md:p-4 space-y-7">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin/settings/users"
                  className="text-blue-700 font-semibold text-lg">
                  Tambah data kantor
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin/settings/offices/form"
                  className="font-normal text-lg">
                  Data kantor
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 px-8 py-12 border shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] rounded-3xl bg-white dark:bg-zinc-800">
          <div className="col-span-2 relative w-full">
            <TextField
              {...register("name")}
              label="Nama Kantor"
              placeholder="Kantor Pusat"
              required
              compact
            />
          </div>
          <div className="relative w-full">
            <TextField
              {...register("code")}
              label="Kode kantor"
              placeholder="001"
              required
              compact
            />
          </div>
          <div className="relative w-full">
            <TextField
              {...register("type")}
              label="Tipe Kantor"
              placeholder="Cabang"
              required
              compact
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-5 col-span-2 overflow-hidden">
            <Button
              type="button"
              className="rounded-full shadow-none px-5 py-3 flex-row items-center gap-2 h-full w-full flex-1 bg-transparent text-indigo-500 hover:bg-transparent cursor-pointer">
              Batal
            </Button>
            <Button
              type="submit"
              className="rounded-full px-5 py-3 flex-row items-center gap-2 h-full w-full flex-1 cursor-pointer">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
