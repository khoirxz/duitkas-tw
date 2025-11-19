import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  Controller,
  type ControllerRenderProps,
} from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Modal } from "@/components/Modal";
import { TextField } from "@/components/textField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FilterIcon, CalendarIcon, TagIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import z from "zod";

interface ModalFilterProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
  startDate: z.string().nonempty("Wajib diisi"),
  endDate: z.string().nonempty("Wajib diisi"),
});

export default function ModalFilter({ open, setOpen }: ModalFilterProps) {
  const { control } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });
  const [tabs, setTabs] = useState<number>(0);

  return (
    <Modal open={open} setOpen={setOpen} title="Filter Penampilan Transaksi">
      <div className="bg-white p-5 space-y-5 font-public relative overflow-auto md:overflow-hidden">
        <div className="flex flex-nowrap justify-start gap-3 w-2xl">
          <TabHeader
            title="Rentan Waktu"
            tabs={tabs}
            setTabs={setTabs}
            number={1}
          />
          <TabHeader title="Harian" tabs={tabs} setTabs={setTabs} number={2} />
          <TabHeader title="Bulanan" tabs={tabs} setTabs={setTabs} number={3} />
          <TabHeader title="Tahunan" tabs={tabs} setTabs={setTabs} number={4} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 bg-white p-5">
        {(() => {
          const tabComponents = {
            1: (
              <>
                <div className="col-span-2 md:col-span-1 flex flex-col gap-2.5">
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => <SelectDate field={field} />}
                  />
                </div>
                <div className="col-span-2 md:col-span-1 flex flex-col gap-2.5">
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => <SelectDate field={field} />}
                  />
                </div>
              </>
            ),
            2: <InputDaily />,
            3: <InputMonthly />,
            4: <InputYears />,
          };
          return tabComponents[tabs as keyof typeof tabComponents] || null;
        })()}

        <div className="col-span-2">
          <p className="text-sm font-medium uppercase text-zinc-600 dark:text-zinc-400">
            Akun yang digunakan
          </p>
          <div className="grid grid-cols-4 gap-3 py-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div className="flex items-center gap-3" key={index}>
                <Checkbox />
                <Label className="text-zinc-600 dark:text-zinc-400">
                  Akun {index + 1}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-2.5">
          <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase bg-white dark:bg-zinc-800">
            Jenis Transaksi
          </label>
          <Select>
            <SelectTrigger className="w-full rounded-full border border-blue-300 px-4.5 py-5.5 dark:bg-zinc-800 relative">
              <SelectValue placeholder="Pilih Kategori" asChild>
                <span>
                  <TagIcon className="size-4 text-primary" />
                  Transaksi 1
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }).map((_, i) => (
                <SelectItem value={i.toString()} key={i}>
                  Transaksi {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2 flex flex-col gap-2.5">
          <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase bg-white dark:bg-zinc-800">
            Kategori
          </label>
          <Select>
            <SelectTrigger className="w-full rounded-full border border-blue-300 px-4.5 py-5.5 dark:bg-zinc-800 relative">
              <SelectValue placeholder="Pilih Kategori" asChild>
                <span>
                  <TagIcon className="size-4 text-primary" />
                  Kategori 1
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }).map((_, i) => (
                <SelectItem value={i.toString()} key={i}>
                  Kategori {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2 md:col-span-1">
          <TextField
            label="Nominal Minimum"
            placeholder="0"
            type="number"
            icon={
              <span className="text-sm font-semibold text-primary">Rp.</span>
            }
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <TextField
            label="Nominal Maksimum"
            placeholder="0"
            type="number"
            icon={
              <span className="text-sm font-semibold text-primary">Rp.</span>
            }
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 justify-end items-center bg-blue-200 py-2 px-5 rounded-b-2xl">
        <Button
          className="rounded-full px-10 bg-transparent text-indigo-600"
          onClick={() => setOpen(false)}>
          Batal
        </Button>
        <Button className="rounded-full w-30 py-5 bg-blue-700 text-white">
          <FilterIcon className="size-4 mr-1" />
          Filter
        </Button>
      </div>
    </Modal>
  );
}

interface TabHeaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  tabs: number;
  setTabs: React.Dispatch<React.SetStateAction<number>>;
  number: number;
}

function TabHeader({ title, tabs, setTabs, number, ...props }: TabHeaderProps) {
  const handleTabs = (index: number) => {
    if (index === tabs) {
      setTabs(0);
      return;
    }
    setTabs(index);
  };

  return (
    <button
      onClick={() => handleTabs(number)}
      className={`${
        tabs === number ? "bg-blue-500 text-white" : "dark:text-primary"
      } rounded-full uppercase font-semibold border-2 border-blue-500 text-sm py-2 w-[150px] text-center`}
      {...props}>
      {title}
    </button>
  );
}

function SelectDate({
  field,
}: {
  field: ControllerRenderProps<z.infer<typeof formSchema>>;
}) {
  return (
    <>
      <label
        htmlFor=""
        className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase bg-white dark:bg-zinc-800">
        Tanggal Akhir
      </label>

      <Popover>
        <div className="border border-blue-300 rounded-full px-4.5 py-3">
          <PopoverTrigger asChild>
            <div className="flex flex-row items-center h-4">
              <button className="flex bg-transparent">
                <CalendarIcon className="size-4 mr-3" color="#3B82F6" />
              </button>
              <span className="text-sm">
                {field.value
                  ? new Intl.DateTimeFormat("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(new Date(field.value))
                  : "Pilih Tanggal"}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value ? new Date(field.value) : undefined}
              onSelect={(date) =>
                field.onChange(date ? date.toISOString() : "")
              }
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              captionLayout="dropdown"
            />
          </PopoverContent>
        </div>
      </Popover>
    </>
  );
}

function InputDaily() {
  return (
    <div className="col-span-2">
      <TextField
        label="Tanggal"
        placeholder="Tanggal"
        icon={<CalendarIcon className="size-4 text-primary" />}
      />
    </div>
  );
}

function InputMonthly() {
  return (
    <>
      <div className="col-span-2 md:col-span-1">
        <TextField
          label="Bulan"
          placeholder="Bulan"
          icon={<CalendarIcon className="size-4 text-primary" />}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <TextField
          label="Tahun"
          placeholder="Tahun"
          icon={<CalendarIcon className="size-4 text-primary" />}
        />
      </div>
    </>
  );
}

function InputYears() {
  return (
    <div className="col-span-2">
      <TextField
        label="Tahun"
        placeholder="Tahun"
        icon={<CalendarIcon className="size-4 text-primary" />}
      />
    </div>
  );
}
