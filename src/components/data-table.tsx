import { ChevronDownIcon, SearchIcon } from "@/assets/icons/outline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type PaginationState,
  type SortingState,
  getSortedRowModel,
  type ColumnDef,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { FilterSolidIcon } from "@/assets/icons/solid";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  pageIndex?: number;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  pageSize = 5,
  pageIndex = 0,
}: DataTableProps<TData, TValue>) => {
  // state
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageIndex,
    pageSize: pageSize,
  });

  // useEffect
  useEffect(() => {
    setPagination({
      pageIndex: pageIndex,
      pageSize: pageSize,
    });

    return () => {
      setPagination({
        pageIndex: 0,
        pageSize: 20,
      });
    };
  }, [pageIndex, pageSize]);

  // custom hook
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  });

  return (
    <div className="w-full">
      <Table className="px-3">
        <TableHeader className="bg-[#E3F2FD] font-domine ">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="py-4 text-blue-500">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export const TableFilter = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("10");

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="hidden md:flex flex-row gap-3 items-center">
        <span>Tampilkan</span>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="relative">
            <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
              <input
                type="text"
                className="w-12 outline-none"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button className="flex absolute bg-white right-2">
                <ChevronDownIcon />
              </button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-28">
            <Command>
              <CommandList>
                <CommandGroup>
                  {[10, 20, 30, 40, 50].map((item) => (
                    <CommandItem
                      key={item}
                      onSelect={() => {
                        setValue(item.toString());
                        setOpen(false);
                      }}>
                      <p>{item}</p>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          Number(value) === item ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <span>data</span>
      </div>
      <div className="flex flex-row gap-3 items-center w-full md:w-auto">
        <div className="flex-1 border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
          <button className="flex bg-white">
            <SearchIcon className="size-4 mr-2" />
          </button>
          <input
            type="text"
            className="outline-none"
            placeholder="cari item disini"
          />
        </div>
        <Button className="rounded-full w-10 h-10 md:w-auto md:h-auto px-6 py-6 md:px-7 md:py-6 flex flex-row items-center gap-2 bg-yellow-600 text-black">
          <span>
            <FilterSolidIcon className="size-5" />
          </span>
          <span className="hidden md:block">Filter</span>
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
