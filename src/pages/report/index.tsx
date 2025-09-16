import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DataTable, {
  PaginationTable,
  TableFilter,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import Layout from "@/layouts/layout";
import { PrinterIcon, Check } from "lucide-react";
import { ChevronDownIcon, GraphIcon } from "@/assets/icons/outline";
import { cn } from "@/lib/utils";

import { columns } from "./components/columns";
import { Badge } from "@/components/ui/badge";
import { FilterModal } from "@/components/filter-modal";
import { formatRupiah } from "@/lib/formatMoney";

import { useFetchReport } from "./hooks/useReport";

export default function ReportPage() {
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  // hooks
  const {
    data: dataReport,
    isFetching,
    isLoading,
  } = useFetchReport({
    akun: search,
    jenis_transaksi: "",
    jumlah_min: "",
    jumlah_max: "",
    limit: limit.toString(),
    page: page.toString(),
  });

  const handleFilter = () => {
    setOpen(true);
  };

  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between mt-5">
          <h1 className="font-bold text-xl">Data Akun</h1>

          <Button
            variant="default"
            className="rounded-full px-5 py-3 flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700 hidden md:flex">
            <span>
              <PrinterIcon color="white" />
            </span>
            Cetak
          </Button>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-5">
          <div className="space-y-10 flex-1">
            <Button
              variant="default"
              className="rounded-full px-5 py-3 flex md:hidden flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700">
              <span>
                <PrinterIcon color="white" />
              </span>
              Cetak
            </Button>

            <TableFilter
              handleModal={handleFilter}
              setLimit={setLimit}
              setSearch={setSearch}
              limit={limit}
            />

            {isFetching && isLoading ? (
              <div className="w-full animate-pulse">
                <div className="h-48 bg-gray-200 rounded-md w-full mb-2"></div>
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={dataReport?.data.transaksi || []}
                pageSize={10}
                border={false}
              />
            )}

            <PaginationTable
              limit={limit}
              page={page}
              setPage={setPage}
              total={dataReport?.data.total || 0}
            />
          </div>
          <div>
            <div className="rounded-3xl p-5 w-full space-y-5 shadow-xl border min-w-64 bg-white dark:bg-zinc-800">
              <h1 className="font-bold">Grafik Laporan</h1>

              <div className="w-full">
                <SelectCategory />
              </div>

              <div className="flex flex-row md:flex-col justify-between gap-4 items-center">
                <DonutChart />

                <div className="flex flex-col gap-1 justify-start w-full">
                  <p className="text-sm text-right md:text-left">
                    Total Pengeluaran
                  </p>
                  <p className="text-lg md:text-xl font-semibold text-right md:text-left">
                    Rp. 20.000.000
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <Badge
                  variant="default"
                  className="text-violet-600 bg-violet-300">
                  11 Transaksi
                </Badge>
                <div className="space-y-2.5 max-h-[200px] md:max-h-[500px] overflow-y-auto">
                  {Array.from({ length: 15 }).map((_, index) => (
                    <div
                      className="flex flex-row md:flex-col gap-2 border-b border-[#EFEFEF] py-2 items-center "
                      key={index}>
                      <div className="text-white bg-blue-700 py-1 px-2 rounded-full text-center md:w-full">
                        <p className="text-xs font-semibold hidden md:block">
                          Pemasaran
                        </p>
                        <span className="block md:hidden w-3 h-5 bg-blue-700"></span>
                      </div>

                      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between flex-1 md:flex-0 w-full">
                        <p className="font-semibold block md:hidden text-sm">
                          Pemasaran
                        </p>
                        <p className="text-xs text-zinc-500">
                          {Math.floor(Math.random() * 20) + 1} Transaksi
                        </p>
                        <p className="font-semibold font-domine text-sm hidden md:block">
                          {formatRupiah(
                            Math.floor(Math.random() * 9000000) + 100000
                          )}
                        </p>
                      </div>

                      <p className="font-semibold font-domine text-sm block md:hidden">
                        {formatRupiah(
                          Math.floor(Math.random() * 10000000) + 100000
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FilterModal open={open} setOpen={setOpen} />
    </Layout>
  );
}

ChartJS.register(ArcElement, Tooltip, Legend);

function getRandomData(length: number, min: number, max: number) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}

const dataChart = {
  labels: ["Makan", "Transport", "Hiburan", "Tagihan", "Lainnya"],
  datasets: [
    {
      data: getRandomData(5, 1, 100),
      backgroundColor: ["#2563eb", "#f59e0b", "#15803d", "#bbf7d0", "#cbd5e1"],
      borderColor: "#ffffff",
      borderWidth: 6,
      borderRadius: 20,
      spacing: 0,
    },
  ],
};

// Remove custom interfaces and use the correct callback signature for Chart.js
const options = {
  cutout: "70%", // besar lubang tengah
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: function (
          tooltipItem: import("chart.js").TooltipItem<"doughnut">
        ) {
          // tooltipItem.raw may be unknown, so we check and format safely
          const value =
            typeof tooltipItem.raw === "number" ? tooltipItem.raw : 0;
          return `Rp. ${value.toLocaleString()}`;
        },
      },
    },
  },
};

function SelectCategory() {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("pemasukan");

  const options: { value: string; label: string; icon: React.ReactNode }[] = [
    {
      value: "pemasukan",
      label: "Pemasukan",
      icon: <GraphIcon color="blue" />,
    },
    {
      value: "pengeluaran",
      label: "Pengeluaran",
      icon: <GraphIcon color="blue" />,
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="w-full rounded-full bg-white text-black border border-blue-600 h-auto py-3 px-4 hover:bg-zinc-300">
          <div className="flex items-center gap-2 w-full">
            <span>
              {options.find((option) => option.value === value)?.icon}
            </span>
            <span className="flex-1 text-left">
              {options.find((option) => option.value === value)?.label}
            </span>
            <ChevronDownIcon />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-64 rounded-2xl">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue as string);
                    setOpen(false);
                  }}>
                  <div className="flex items-center gap-2">
                    <span>{option.icon}</span> <span>{option.label}</span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function DonutChart() {
  return (
    <div className="w-36 h-36 md:w-40 md:h-40 md:mx-auto">
      <Doughnut data={dataChart} options={options} />
    </div>
  );
}
