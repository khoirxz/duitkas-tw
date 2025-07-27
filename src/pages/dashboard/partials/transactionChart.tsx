import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { AnimatePresence } from "motion/react";

import { ChevronDownIcon, GraphIcon } from "@/assets/icons/outline";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

import useScroll from "@/hooks/use-scroll";

export default function TransactionChart() {
  const { scrollRef, scrollPosition, handleScroll, ScrollIndicator } =
    useScroll();

  return (
    <div className="flex flex-col justify-between h-full gap-4">
      <p className="font-semibold">Ringkasan Transaksi</p>

      <div className="w-full">
        <SelectCategory />
      </div>

      <div className="flex flex-row md:flex-col justify-between gap-4 items-center">
        <DonutChart />

        <div className="flex flex-col gap-1 justify-start w-full">
          <p className="text-sm text-right md:text-left">Total Pengeluaran</p>
          <p className="text-lg md:text-xl font-semibold text-right md:text-left">
            Rp. 20.000.000
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <Badge variant="default" className="text-violet-600 bg-violet-300">
          11 Transaksi
        </Badge>

        <div className="relative">
          <div
            className="space-y-2.5 max-h-[190px] overflow-y-auto snap-x snap-mandatory relative scroll-smooth"
            ref={scrollRef}
            onScroll={handleScroll}>
            {Array.from({ length: 5 }).map((_, index) => (
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
                  <p className="text-xs text-zinc-500">1 Transaksi</p>
                  <p className="font-semibold font-domine text-sm hidden md:block">
                    Rp. 7.500.000
                  </p>
                </div>

                <p className="font-semibold font-domine text-sm block md:hidden">
                  Rp. 7.500.000
                </p>
              </div>
            ))}
          </div>
          <AnimatePresence>
            {(scrollPosition === "top" || scrollPosition === "middle") && (
              <ScrollIndicator position="bottom" />
            )}

            {(scrollPosition === "bottom" || scrollPosition === "middle") && (
              <ScrollIndicator position="top" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

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

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Makan", "Transport", "Hiburan", "Tagihan", "Lainnya"],
  datasets: [
    {
      data: [60, 20, 10, 3, 7],
      backgroundColor: ["#2563eb", "#f59e0b", "#15803d", "#bbf7d0", "#cbd5e1"],
      borderColor: "#ffffff",
      borderWidth: 6,
      borderRadius: 20, // 🟢 Ini dia tumpulnya
      spacing: 0, // 🟢 Ini jarak antar segmen
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

function DonutChart() {
  return (
    <div className="w-30 h-30 md:w-40 md:h-40 mx-auto">
      <Doughnut data={data} options={options} />
    </div>
  );
}
