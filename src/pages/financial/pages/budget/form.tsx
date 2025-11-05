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

import { TrashIcon, RefreshCcwIcon } from "lucide-react";
import { TextField } from "@/components/textField";
import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { AddCircleSolidIcon } from "@/assets/icons/solid";
import { TagIcon } from "@/assets/icons/outline";
import budgetImg from "@/assets/financial/chart-3d.png";

import Layout from "@/layouts/layout";
// import ModalType from "../../components/modalType";
import LeadingText from "../../components/LeadingText";
import SearchableSelect from "../../components/SearchableSelect";
import {
  useCreateBudget,
  useCreateBudgetContent,
  useUpdateBudget,
} from "../../hooks/useFinancial";
import { useFetchCategories } from "../../hooks/useCategory";
import { useNavigate } from "react-router";

const portionMap: Record<string, string> = {
  percen: "persentase",
  nominal: "nominal",
  hybrid: "hybrid",
};

const categorySchema = z.object({
  name: z.string().min(1, "Wajib diisi"),
  percentage: z.number().min(1, "Minimal 1%"),
});

const financialSchema = z.object({
  name: z.string().nonempty("Nama Perencanaan wajib diisi"),
  portion: z
    .enum(["percen", "nominal", "hybrid"], "Tipe Perencanaan wajib diisi")
    .default("percen")
    .nonoptional(),
});

const formSchema = financialSchema.extend({
  categories: z.array(categorySchema).min(1, "Minimal 1 kategori"),
});

export default function BudgetFormPage() {
  // setelah submit kategori, makan akan lanjut ke step 2
  // pada response akan memberikan id dari perencanaan yang baru dibuat
  // kemudian akan disimpan di state id
  const [id, setId] = useState<string>("");
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
      portion: "percen",
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
  const navigate = useNavigate();

  const { data: categoriesData } = useFetchCategories();
  const { mutateAsync: createBudget, isPending: pendingBudget } =
    useCreateBudget();
  const { mutateAsync: updateBudget, isPending: pendingUpdateBudget } =
    useUpdateBudget();
  const { mutateAsync: createBudgetContent } = useCreateBudgetContent();

  const onUpdateBudget = () => {
    console.log("onUpdateBudget");
    try {
      const formData = new FormData();
      formData.append("nama_perencanaan", watch("name"));
      formData.append("porsi", portionMap[watch("portion")]);
      formData.append("id_perencanaan", id);

      if (step === 2) {
        updateBudget(formData, {
          onSuccess: () => {
            console.log("berhasil update budget");
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    try {
      const formData = new FormData();

      formData.append("id_perencanaan", id);
      data.categories.forEach((cat) => {
        formData.append(`kategori[${cat.name}]`, cat.percentage.toString());
      });
      createBudgetContent(formData, {
        onSuccess: () => {
          navigate("/admin/financial", { replace: true });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitCategories: SubmitHandler<z.infer<typeof financialSchema>> = (
    data
  ) => {
    if (step === 1) {
      const formData = new FormData();
      formData.append("nama_perencanaan", data.name);
      formData.append("porsi", portionMap[data.portion]);
      createBudget(formData, {
        onSuccess: (response) => {
          setStep(2);
          // get response data insert_id lalu simpan di state
          setId(response.data.insert_id);
        },
      });
    }
  };

  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div>
          <AppBreadcrumb
            data={[
              {
                name: "Perencanaan Dana",
                link: "/admin/financial",
              },
              {
                name: "Tambah Perencanaan Dana",
                link: "/admin/financial/form/budget",
              },
            ]}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="flex flex-col px-6 md:px-10 py-8 shadow-[0px_2px_4px_0px_#0000001A] border rounded-3xl bg-white dark:bg-zinc-800 mx-3 mb-5 space-y-10">
        <div className="flex flex-col md:flex-row gap-14 md:gap-10">
          {/* <ModalType /> */}
          <div className="flex flex-col gap-3 items-center">
            <img
              src={budgetImg}
              alt="Current Type"
              className="aspect-square w-40 md:w-xs mx-auto"
            />

            <p className="font-semibold text-center uppercase">
              PORSI DIGUNAKAN
            </p>
            <span className="bg-blue-400/20 text-blue-500 py-1 px-3 rounded-md text-xs uppercase font-semibold">
              {watch("portion")}
            </span>
          </div>

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
              <LeadingText
                typeCategory={watch("portion")}
                total={totalPercentage}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className={"flex flex-col gap-3 w-full"}>
                <TextField
                  {...register("name")}
                  compact={step === 2}
                  label="Nama Perencanaan"
                  icon={<TagIcon className="size-4" color="#3B82F6" />}
                  disabled={step === 2}
                  placeholder="Nama Perencanaan"
                  error={!!errors.name}
                  errorMessage={errors.name?.message}
                />
              </div>
              {step === 1 ? (
                <div>
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor=""
                      className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase">
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
                          <SelectTrigger className="w-full rounded-full border border-blue-400/40 px-4.5 h-10! dark:bg-zinc-800">
                            <SelectValue placeholder="Pilih porsi" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              { value: "percen", label: "Persentase" },
                              { value: "nominal", label: "Nominal" },
                              { value: "hybrid", label: "Hybrid" },
                            ].map((item) => (
                              <SelectItem value={item.value} key={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <span className="text-red-500 text-sm">
                    {errors.portion?.message}
                  </span>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col gap-3">
                    <Controller
                      control={control}
                      name="portion"
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            onUpdateBudget();
                          }}
                          defaultValue={field.value}>
                          <SelectTrigger
                            disabled={pendingUpdateBudget}
                            className="relative w-full rounded-full border bg-green-600 text-white px-4.5 h-10! dark:bg-zinc-800">
                            <div className="absolute left-1/2 -translate-x-1/2 flex flex-row items-center gap-2">
                              <RefreshCcwIcon className="size-4 text-white" />
                              Ubah porsi [{field.value}]
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              { value: "percen", label: "Persentase" },
                              { value: "nominal", label: "Nominal" },
                              { value: "hybrid", label: "Hybrid" },
                            ].map((item) => (
                              <SelectItem value={item.value} key={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              )}

              {step === 2 &&
                fields.map((field, index) => (
                  <div className="col-span-2" key={field.id}>
                    <div className="flex gap-4 mt-2">
                      <div className="flex-1 flex flex-col md:flex-row gap-5 items-center">
                        <div className="relative w-full">
                          <Controller
                            control={control}
                            name={`categories.${index}.name`}
                            render={({ field: selectField }) => (
                              <SearchableSelect
                                onChange={(value) =>
                                  selectField.onChange(value)
                                }
                                defaultValue={selectField.value}
                                placeholder="Pilih Kategori"
                                options={
                                  categoriesData?.data.kategori?.map(
                                    (cat: {
                                      id_kategori: string;
                                      nama_kategori: string;
                                      tipe: string;
                                    }) => ({
                                      value: cat.id_kategori,
                                      label: cat.nama_kategori,
                                      category: cat.tipe,
                                    })
                                  ) || []
                                }
                              />
                            )}
                          />
                        </div>
                        <div className="relative w-full">
                          <TextField
                            {...register(`categories.${index}.percentage`, {
                              valueAsNumber: true,
                            })}
                            type="number"
                            label={
                              watch("portion") === "percen"
                                ? "Persentase"
                                : "Nominal"
                            }
                            icon={
                              watch("portion") === "percen" ? (
                                <span className="text-sm text-primary">%</span>
                              ) : (
                                <span className="text-sm text-primary">Rp</span>
                              )
                            }
                            compact
                            placeholder={
                              watch("portion") === "percen"
                                ? "Persentase"
                                : "Nominal"
                            }
                          />
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
            className="bg-transparent text-indigo-600 flex-1 rounded-full py-3 md:py-5 w-full hover:bg-gray-100 shadow-none">
            {step === 2 ? "Kembali" : "Batal"}
          </Button>
          {step === 1 ? (
            <Button
              onClick={() => onSubmitCategories(watch())}
              disabled={
                ["percen", "nominal", "hybrid"].indexOf(watch("portion")) ===
                  -1 ||
                watch("name") === "" ||
                pendingBudget
              }
              type="button"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-full py-3 md:py-5 w-full">
              {pendingBudget ? "Menyimpan..." : "Selanjutnya"}
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
