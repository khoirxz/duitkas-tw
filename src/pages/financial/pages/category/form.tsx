import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { BlockPicker } from "react-color";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";

import Layout from "@/layouts/layout";
import { TextField } from "@/components/textField";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const formScheme = z.object({
  name: z.string().min(1, "Nama Perencanaan wajib diisi"),
  id_budget: z.number().min(1, "Pilih perencanaan"),
  color: z.string().min(1, "Pilih warna"),
});

export default function FinancialCategoryFormPage() {
  const { control, handleSubmit } = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: "",
      id_budget: 0,
      color: "#000000",
    },
  });

  const onSubmit = (data: z.infer<typeof formScheme>) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between mt-5">
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/admin/settings/users"
                    className="text-blue-700 font-semibold text-lg">
                    Perencanaan Data
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/admin/settings/offices/form"
                    className="font-normal text-lg">
                    Data Kategori
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-12 border shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] rounded-3xl bg-white">
          <div className="relative w-full">
            <TextField
              compact
              label="Nama Kategori"
              placeholder="Nama Kategori"
            />
          </div>
          <div className="relative w-full">
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <Popover>
                  <div className="flex items-center h-full">
                    <p>Pilih Warna</p>
                    <PopoverTrigger asChild>
                      <span
                        className="ml-2 w-8 h-8 rounded-full"
                        style={{ backgroundColor: field.value }}></span>
                    </PopoverTrigger>
                  </div>
                  <PopoverContent className="p-0 min-w-0 w-auto">
                    <BlockPicker
                      triangle="hide"
                      color={
                        typeof field.value === "string" ? field.value : "#000"
                      }
                      onChange={(color) => field.onChange(color.hex)}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>
          <div className="relative w-full col-span-2">
            <TextField compact label="Kategori" placeholder="Kategori" />
          </div>

          <div className="flex flex-row justify-between items-center gap-5 col-span-2 overflow-hidden">
            <Button
              type="button"
              className="rounded-full px-5 py-3 flex-row items-center gap-2 h-full w-full flex-1 bg-transparent text-indigo-500 hover:bg-transparent cursor-pointer">
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
