import { useState } from "react";

import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ChevronDown } from "lucide-react";
import { CalendarIcon } from "@/assets/icons/outline";

const months: { value: string; label: string }[] = [
  { value: "0", label: "Januari" },
  { value: "1", label: "Februari" },
  { value: "2", label: "Maret" },
  { value: "3", label: "April" },
  { value: "4", label: "Mei" },
  { value: "5", label: "Juni" },
  { value: "6", label: "Juli" },
  { value: "7", label: "Agustus" },
  { value: "8", label: "September" },
  { value: "9", label: "Oktober" },
  { value: "10", label: "November" },
  { value: "11", label: "Desember" },
];

interface DateSelectorProps {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  type: "month" | "year";
}

export function DatePicker({
  selectedDate,
  setSelectedDate,
  children,
  open,
  setOpen,
  type,
}: DateSelectorProps) {
  const [handleOpen, setHandleOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i); // 50 tahun ke belakang

  const handleMonthChange = (month: string) => {
    const newDate = new Date(selectedDate!);
    newDate.setMonth(Number.parseInt(month));
    setSelectedDate(newDate);
  };

  return (
    <Popover
      open={open ? open : handleOpen}
      onOpenChange={setOpen ? setOpen : setHandleOpen}>
      {children ? (
        <PopoverTrigger asChild>{children}</PopoverTrigger>
      ) : (
        <PopoverTrigger asChild>
          <button className="rounded-full bg-white text-black border-blue-300 border flex flex-row items-center gap-2 px-3.5 py-2">
            <CalendarIcon className="size-5 mr-1" />
            <span className="min-w-22 text-left uppercase">
              {type === "month"
                ? months[selectedDate!.getMonth()].label
                : selectedDate!.getFullYear().toString()}
            </span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </PopoverTrigger>
      )}

      <PopoverContent className="w-80 p-3">
        {type === "year" && (
          <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto">
            {years.map((year) => (
              <Button
                key={year}
                variant={
                  selectedDate!.getFullYear() === year ? "default" : "outline"
                }
                size="sm"
                className="h-10 text-xs"
                onClick={() => {
                  handleMonthChange("0");
                  setSelectedDate(new Date(year, 0));
                }}>
                {year}
              </Button>
            ))}
          </div>
        )}
        {type === "month" && (
          <div className="grid grid-cols-3 gap-2">
            {months.map((month) => (
              <Button
                key={month.value}
                variant={
                  selectedDate!.getMonth() === Number.parseInt(month.value)
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="h-10 text-xs"
                onClick={() => {
                  handleMonthChange(month.value);
                }}>
                {month.label}
              </Button>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
