import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";

import { TextField, TextArea } from "@/components/textField";
import { Button } from "@/components/ui/button";
import Layout from "@/layouts/layout";
import {
  MailIcon,
  MapPin,
  User2Icon,
  CheckIcon,
  XIcon,
  LoaderCircleIcon,
} from "lucide-react";

import {
  useSetting,
  useCheckIdentity,
  useUpdateSetting,
} from "./hooks/useSetting";
import type { AxiosError } from "axios";
import type { ResponseProps } from "@/types/response";

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
    watch,
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
  const {
    mutate: checkIdentity,
    isPending: isLoadingCheck,
    data: dataCheck,
  } = useCheckIdentity();
  const { mutate: updateSettings } = useUpdateSetting();

  const identity = watch("identity");

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

  const debouncedCheck = useMemo(
    () =>
      debounce((value: string) => {
        const formData = new FormData();
        formData.append("identitas", value || "");
        checkIdentity(formData);
      }, 500),
    [checkIdentity]
  );

  useEffect(() => {
    if (!identity) return;
    debouncedCheck(identity);

    return () => debouncedCheck.cancel();
  }, [debouncedCheck, identity]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    try {
      const formData = new FormData();

      formData.append("nama", "test"); // nama
      formData.append("direktur", data.accountName);
      formData.append("email", data.email);
      formData.append("identitas", data.identity);
      formData.append("jenis_usaha", data.identity); // jenis_usaha
      formData.append("kota", data.identity); // kota
      formData.append("provinsi", data.identity); // provinsi
      formData.append("alamat", data.address); // alamat
      formData.append("kontak", data.whatsapp);

      updateSettings(formData);
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
      <div className="w-full p-2 md:p-5 space-y-7">
        <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between mt-5">
          <h1 className="font-bold text-xl">Konfigurasi Perusahaan</h1>

          <div className="flex justify-end items-center w-full">
            <Button
              asChild
              variant="default"
              className="rounded-full px-5 py-3 flex-row items-center gap-2 h-full md:w-auto bg-blue-700 dark:text-white">
              <Link to="/admin/settings/users">Data pengguna</Link>
            </Button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4 md:px-8 py-12 border shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] rounded-3xl bg-white dark:bg-zinc-900">
          <div className="relative w-full col-span-2">
            {isLoading ? (
              <div className="border border-blue-300/30 rounded-full px-4.5 py-3 flex flex-row items-center bg-blue-300/30 animate-pulse h-12"></div>
            ) : (
              <TextField
                {...register("identity")}
                compact
                label="Identitas Akun"
                placeholder="duitkas.com"
                endLabel={
                  openForm ? (
                    isLoadingCheck ? (
                      <LoaderCircleIcon className="size-4 animate-spin text-blue-500" />
                    ) : dataCheck ? (
                      <CheckIcon className="size-4 text-green-500" />
                    ) : (
                      <XIcon className="size-4 text-red-500" />
                    )
                  ) : null
                }
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
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 col-span-2 overflow-hidden">
              <Button
                onClick={() => setOpenForm(false)}
                className="rounded-full px-5 py-3 flex-row items-center gap-2 h-full w-full flex-1 bg-transparent text-indigo-500 hover:bg-transparent cursor-pointer">
                Batal
              </Button>
              <Button className="rounded-full px-5 py-3 flex-row items-center gap-2 h-full w-full flex-1 cursor-pointer dark:text-white">
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
