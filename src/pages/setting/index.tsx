import { useEffect, useState } from "react";
import { Link } from "react-router";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextField, TextArea } from "@/components/textField";
import { Button } from "@/components/ui/button";
import Layout from "@/layouts/layout";
import { MailIcon, MapPin, User2Icon } from "lucide-react";

import { useSetting } from "./hooks/useSetting";

const formSchema = z.object({
  identity: z.string().min(1, "Identitas akun tidak boleh kosong"),
  accountName: z.string().min(1, "Nama akun tidak boleh kosong"),
  email: z.email().min(1, "Email tidak boleh kosong"),
  whatsapp: z.string().min(1, "No. WhatsApp tidak boleh kosong"),
  address: z.string().min(1, "Alamat tidak boleh kosong"),
});

export default function SettingPage() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identity: "",
      accountName: "",
      email: "",
      whatsapp: "",
      address: "",
    },
  });
  const { data: settings, isLoading } = useSetting();

  useEffect(() => {
    if (settings) {
      reset({
        identity: settings.data[0]?.identitas || "",
        accountName: settings.data[0]?.nama_perusahaan || "",
        email: settings.data[0]?.email || "",
        whatsapp: settings.data[0]?.kontak || "",
        address: settings.data[0]?.alamat || "",
      });
    }
  }, [settings, reset]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    console.log("Form submitted with data:", data);
    // Handle form submission logic here
  };

  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between mt-5">
          <h1 className="font-bold text-xl">Konfigurasi Perusahaan</h1>

          <Button
            asChild
            variant="default"
            className="rounded-full px-5 py-3 flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700 hidden md:flex">
            <Link to="/admin/settings/users">Data pengguna</Link>
          </Button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 px-8 py-12 border shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] rounded-3xl bg-white">
          <div className="relative w-full col-span-2">
            {isLoading ? (
              <div className="border border-blue-300/30 rounded-full px-4.5 py-3 flex flex-row items-center bg-blue-300/30 animate-pulse h-12"></div>
            ) : (
              <TextField
                {...register("identity")}
                compact
                label="Identitas Akun"
                placeholder="duitkas.com"
                endLabel="demo"
                id="identitas"
                error={!!errors.identity}
                ErrorMessage={errors.identity?.message}
                disabled={!openForm}
              />
            )}
          </div>
          <div className="relative w-full col-span-2">
            {isLoading ? (
              <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center bg-blue-300 animate-pulse h-12"></div>
            ) : (
              <TextField
                {...register("accountName")}
                compact
                label="Nama pemilik akun"
                placeholder="umay halim"
                icon={<User2Icon className="size-4" color="#3B82F6" />}
                id="accountName"
                error={!!errors.accountName}
                ErrorMessage={errors.accountName?.message}
                disabled={!openForm}
              />
            )}
          </div>

          <div className="relative w-full col-span-2 md:col-span-1">
            {isLoading ? (
              <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center bg-blue-300 animate-pulse h-12"></div>
            ) : (
              <TextField
                {...register("email")}
                compact
                label="email"
                placeholder="demos@duitkas.com"
                icon={<MailIcon className="size-4" color="#3B82F6" />}
                id="email"
                error={!!errors.email}
                ErrorMessage={errors.email?.message}
                disabled={!openForm}
              />
            )}
          </div>
          <div className="relative w-full col-span-2 md:col-span-1">
            {isLoading ? (
              <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center bg-blue-300 animate-pulse h-12"></div>
            ) : (
              <TextField
                {...register("whatsapp")}
                compact
                label="NO. WHATSAPP"
                placeholder="+62"
                id="whatsapp"
                error={!!errors.whatsapp}
                ErrorMessage={errors.whatsapp?.message}
                disabled={!openForm}
              />
            )}
          </div>

          <div className="flex flex-col gap-3 col-span-2">
            {isLoading ? (
              <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center bg-blue-300 animate-pulse h-12"></div>
            ) : (
              <TextArea
                icon={<MapPin className="size-4" color="#3B82F6" />}
                compact
                label="ALAMAT PERUSAHAAN"
                {...register("address")}
                disabled={!openForm}
              />
            )}
          </div>

          {openForm ? (
            <div className="flex flex-row justify-between items-center gap-5 col-span-2 overflow-hidden">
              <Button
                onClick={() => setOpenForm(false)}
                className="rounded-full px-5 py-3 flex-row items-center gap-2 h-full w-full flex-1 bg-transparent text-indigo-500 hover:bg-transparent cursor-pointer">
                Batal
              </Button>
              <Button className="rounded-full px-5 py-3 flex-row items-center gap-2 h-full w-full flex-1 cursor-pointer">
                Simpan
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setOpenForm(true)}
              className="rounded-full px-5 py-3 flex-row items-center gap-2 h-full w-full md:w-auto col-span-2 bg-amber-600 hover:bg-amber-400 text-inherit cursor-pointer">
              Ubah
            </Button>
          )}
        </form>
      </div>
    </Layout>
  );
}
