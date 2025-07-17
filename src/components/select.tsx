import React, { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { ChevronDown, Check } from "lucide-react";

interface SelectOptionsProps {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
}

export interface SelectProps {
  // Required props
  options: SelectOptionsProps[];
  placeholder: string;

  // Optional props
  label?: string;
  required?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  icon?: React.ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
  helperText?: string;
  children?: React.ReactNode;

  // Styling props
  height?: string;
  width?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder,
  label,
  required = false,
  value = "",
  onValueChange,
  icon: Icon,
  searchable = true,
  searchPlaceholder = "Search...",
  emptyMessage = "No options found.",
  disabled = false,
  className,
  error,
  helperText,
  height = "h-12",
  width = "w-full",
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [internalValue, setInternalValue] = useState(value);

  const currentValue = onValueChange ? value : internalValue;
  const setValue = onValueChange || setInternalValue;

  const selectedOption = options.find(
    (option) => option.value === currentValue
  );

  const handleSelect = (selectedValue: string) => {
    const newValue = selectedValue === currentValue ? "" : selectedValue;
    setValue(newValue);
    setOpen(false);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Dropdown */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              width,
              height,
              "justify-between px-3 text-left font-normal border-gray-200 hover:border-gray-300",
              !currentValue && "text-muted-foreground",
              error && "border-red-300 focus:border-red-500 focus:ring-red-500",
              disabled && "opacity-50 cursor-not-allowed"
            )}>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {Icon && Icon}
              <div className="flex flex-col min-w-0 flex-1">
                <span
                  className={cn(
                    "text-sm truncate",
                    currentValue ? "text-gray-900" : "text-gray-500"
                  )}>
                  {selectedOption?.label || placeholder}
                </span>
                {selectedOption?.description && (
                  <span className="text-xs text-gray-400 truncate">
                    {selectedOption.description}
                  </span>
                )}
              </div>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-gray-400" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className={cn(width, "p-0")} align="start">
          {searchable ? (
            <Command>
              <CommandInput placeholder={searchPlaceholder} className="h-9" />
              <CommandList>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      onSelect={() => handleSelect(option.value)}>
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {option.icon && (
                          <span className="text-lg flex-shrink-0">
                            {option.icon}
                          </span>
                        )}
                        {Icon && !option.icon && (
                          <span className="text-lg flex-shrink-0">{Icon}</span>
                        )}
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="font-medium truncate">
                            {option.label}
                          </span>
                          {option.description && (
                            <span className="text-xs text-gray-500 truncate">
                              {option.description}
                            </span>
                          )}
                        </div>
                      </div>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4 flex-shrink-0",
                          currentValue === option.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          ) : (
            <div className="max-h-60 overflow-y-auto p-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  disabled={option.disabled}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-sm transition-colors",
                    currentValue === option.value && "bg-blue-50 text-blue-900",
                    option.disabled && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() =>
                    !option.disabled && handleSelect(option.value)
                  }>
                  {option.icon && (
                    <span className="text-lg flex-shrink-0">{option.icon}</span>
                  )}
                  {Icon && !option.icon && (
                    <span className="text-lg flex-shrink-0">{Icon}</span>
                  )}
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-medium text-sm truncate">
                      {option.label}
                    </span>
                    {option.description && (
                      <span className="text-xs text-gray-500 truncate">
                        {option.description}
                      </span>
                    )}
                  </div>
                  {currentValue === option.value && (
                    <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* Helper text or error */}
      {(helperText || error) && (
        <p
          className={cn(
            "mt-1 text-xs",
            error ? "text-red-600" : "text-gray-500"
          )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Select;
