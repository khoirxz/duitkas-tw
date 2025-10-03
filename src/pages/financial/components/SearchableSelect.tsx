import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Dummy options data
const defaultOptions = [
  { value: "react", label: "React", category: "Framework" },
  { value: "vue", label: "Vue.js", category: "Framework" },
  { value: "angular", label: "Angular", category: "Framework" },
  { value: "svelte", label: "Svelte", category: "Framework" },
  { value: "nextjs", label: "Next.js", category: "Framework" },
  { value: "typescript", label: "TypeScript", category: "Language" },
  { value: "javascript", label: "JavaScript", category: "Language" },
  { value: "python", label: "Python", category: "Language" },
  { value: "java", label: "Java", category: "Language" },
  { value: "go", label: "Go", category: "Language" },
  { value: "rust", label: "Rust", category: "Language" },
  { value: "tailwind", label: "Tailwind CSS", category: "Styling" },
  { value: "bootstrap", label: "Bootstrap", category: "Styling" },
  { value: "sass", label: "Sass", category: "Styling" },
];

interface Option {
  value: string;
  label: string;
  category?: string;
}

interface SearchableSelectProps {
  options?: Option[];
  placeholder?: string;
  onChange?: (value: string | null) => void;
  defaultValue?: string;
}

export default function SearchableSelect({
  options = defaultOptions,
  placeholder = "Select an option...",
  onChange,
  defaultValue,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | null>(
    defaultValue || null
  );
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          option.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchQuery, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    setSearchQuery("");
    onChange?.(value);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValue(null);
    setSearchQuery("");
    onChange?.(null);
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  // Group options by category
  const groupedOptions = filteredOptions.reduce((acc, option) => {
    const category = option.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(option);
    return acc;
  }, {} as Record<string, Option[]>);

  return (
    <div ref={containerRef} className="w-full max-w-md mx-auto relative">
      {/* Select Trigger */}
      <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase bg-white dark:bg-zinc-800 absolute left-4 top-[-12px] px-2 rounded-sm z-10">
        Nama Kategori <span className="text-red-500">*</span>
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between border border-blue-400/40 rounded-full transition-colors px-4.5 py-2.5 h-10",
          isOpen && "ring-2 ring-ring ring-offset-2"
        )}>
        <span
          className={cn("text-sm", !selectedOption && "text-muted-foreground")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="flex items-center gap-1">
          {selectedOption && (
            <span
              onClick={handleClear}
              className="hover:bg-muted rounded p-0.5 transition-colors"
              aria-label="Clear selection">
              <X className="h-4 w-4" />
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              isOpen && "transform rotate-180"
            )}
          />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg py-1">
          {/* Search Input */}
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-64 overflow-y-auto py-1">
            {filteredOptions.length > 0 ? (
              Object.entries(groupedOptions).map(
                ([category, categoryOptions]) => (
                  <div key={category}>
                    <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {category}
                    </div>
                    {categoryOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className={cn(
                          "w-full px-3 py-2 text-left hover:bg-muted transition-colors flex items-center justify-between text-sm",
                          selectedValue === option.value && "bg-muted"
                        )}>
                        <span>{option.label}</span>
                        {selectedValue === option.value && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                )
              )
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
