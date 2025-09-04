import { useState } from "react";

import {
  CommandDialog,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";

import { WorkCaseIcon } from "@/assets/icons/outline";
import { cn } from "@/lib/utils";

interface OptionType {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  multiple?: boolean;
  onChange: (value: string) => void;
  data: OptionType[];
  title?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  title,
  value,
  onChange,
  data,
  multiple = false,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase bg-white dark:bg-zinc-800 absolute left-4 top-[-12px] px-2 rounded-sm z-10">
        {title} <span className="text-red-500">*</span>
      </span>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        className="w-full rounded-full max-h-10 bg-white dark:bg-zinc-800 text-black border border-blue-400/40 h-auto py-2.5 px-4.5 hover:bg-zinc-300 dark:text-white">
        <div className="flex items-center gap-2 w-full">
          <span className="aspect-square flex items-center">
            <WorkCaseIcon className="size-5 mr-1" color="#2B63E2" />
          </span>

          <span className="flex-1 text-left">
            {value ? data.find((item) => item.value === value)?.label : "Pilih"}
          </span>
          <ChevronDown />
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandList>
          <CommandGroup heading="Silahkan pilih item dibawah ini">
            {data.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  onChange(currentValue);
                  if (!multiple) {
                    setOpen(false);
                  }
                }}>
                <div className="flex items-center">
                  <span>{option.label}</span>
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
      </CommandDialog>
    </>
  );
};
export default CustomSelect;
