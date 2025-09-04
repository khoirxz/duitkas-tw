import { useEffect } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/textField";
import { SlashIcon, GlobeIcon } from "lucide-react";
import CustomSelect from "@/components/select";

import Layout from "@/layouts/layout";
import { WorkCaseIcon } from "@/assets/icons/outline";

import {
  useFetchUserDetailSettings,
  useCreateUserSettings,
  useUpdateUserSettings,
} from "../../hooks/useUser";
import { useFetchOfficeSettings } from "../../hooks/useOffice";

const formSchema = z.object({
  username: z.string().min(1, "Username tidak boleh kosong"),
  office: z.string().min(1, "Kantor tidak boleh kosong"),
  access: z.string().min(1, "Akses tidak boleh kosong"),
  role: z.string().min(1, "Role tidak boleh kosong"),
});

const options: { value: string; label: string }[] = [
  {
    value: "1",
    label: "Operator",
  },
  {
    value: "2",
    label: "Admin",
  },
  {
    value: "0",
    label: "Super Admin",
  },
];

export default function SettingUserFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const { data: userData } = useFetchUserDetailSettings(id!);
  const { data: officeData } = useFetchOfficeSettings();
  const { mutate: createUser } = useCreateUserSettings({
    onSuccess: () => {
      navigate("/admin/settings/users/", {
        replace: true,
        state: { refresh: true },
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
  const { mutate: updateUser } = useUpdateUserSettings({
    onSuccess: () => {
      navigate("/admin/settings/users/", {
        replace: true,
        state: { refresh: true },
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  useEffect(() => {
    if (userData) {
      reset({
        username: userData.data?.username || "",
        office: userData.data?.id_kantor || "",
        // access: userData.data?.password || "",
        role: userData.data?.role || "",
      });
    }
  }, [userData, reset]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    if (id) {
      formData.append("id_user", id);
    }
    formData.append("username", data.username);
    formData.append("role", data.role);
    formData.append("id_kantor", data.office);
    // formData.append("access", data.access); // Access is not used in the backend yet
    formData.append("password", "12345678"); // Default password

    if (id) {
      updateUser(formData);
    } else {
      createUser(formData);
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
                  href="/admin/settings/users"
                  className="text-blue-700 font-semibold text-lg">
                  Tambah data pengguna
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin/settings/users/form"
                  className="font-normal text-lg">
                  Data pengguna
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 px-8 py-12 border shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] rounded-3xl bg-white dark:bg-zinc-800">
          <div className="col-span-2 relative w-full">
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <CustomSelect
                  title="ROLE PENGGUNA"
                  value={field.value}
                  onChange={field.onChange}
                  data={options}
                />
              )}
            />
            {errors.role && (
              <span className="text-xs text-red-500 absolute -bottom-[18px] left-4">
                {errors.role?.message as string}
              </span>
            )}
          </div>

          <TextField
            {...register("username")}
            autoComplete="off"
            required
            compact
            label="Username"
            placeholder="Username"
            icon={<WorkCaseIcon className="size-5 mr-1" color="#2B63E2" />}
            error={!!errors.username}
            ErrorMessage={errors.username?.message as string}
          />
          <div className="relative w-full flex">
            <Controller
              control={control}
              name="office"
              render={({ field }) => (
                <>
                  <label
                    htmlFor="id_category"
                    className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase bg-white dark:bg-zinc-800 absolute left-4 top-[-12px] px-2">
                    kantor <span className="text-red-500">*</span>
                  </label>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <SelectTrigger className="w-full flex justify-start h-10! py-2.5 px-4.5 rounded-full border border-blue-300 dark:bg-zinc-800">
                      <span className="">
                        <GlobeIcon className="size-5 mr-1" color="#2B63E2" />
                      </span>
                      <span className="flex-1 text-left text-sm">
                        {field.value
                          ? officeData?.data.find(
                              (item) => item.id_kantor === field.value
                            )?.nama
                          : "Pilih kantor"}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {officeData?.data.map((item) => (
                        <SelectItem value={item.id_kantor} key={item.id_kantor}>
                          {item.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
            />
          </div>

          <div className="col-span-2 relative w-full">
            <Controller
              control={control}
              name="access"
              render={({ field }) => (
                <CustomSelect
                  title="akses yang diberikan"
                  value={field.value}
                  onChange={field.onChange}
                  data={options}
                  multiple
                />
              )}
            />
            {errors.access && (
              <span className="text-xs text-red-500 absolute -bottom-[18px] left-4">
                {errors.access?.message as string}
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-5 col-span-2 overflow-hidden">
            <Button className="rounded-full px-5 py-3 flex-row items-center gap-2 h-full w-full flex-1 bg-transparent text-indigo-500 hover:bg-transparent cursor-pointer">
              Batal
            </Button>
            <Button className="rounded-full px-5 py-3 flex-row items-center gap-2 h-full w-full flex-1 cursor-pointer dark:text-white">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
