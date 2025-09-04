import { useEffect, useState } from "react";
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
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { Check, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { FilterSolidIcon } from "@/assets/icons/solid";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  pageIndex?: number;
  border?: boolean;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  pageSize = 5,
  pageIndex = 0,
  border = true,
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
        <TableHeader className="bg-[#E3F2FD] dark:bg-zinc-800 font-domine ">
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
        <TableBody className="bg-white dark:bg-zinc-700">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(border ? " " : "border-none")}>
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

interface TableFilterProps {
  showRowCount?: boolean;
  handleModal?: () => void;
  setLimit?: (value: number) => void;
  limit?: number;

  setSearch?: (value: string) => void;
}

export const TableFilter: React.FC<TableFilterProps> = ({
  showRowCount = true,
  handleModal,
  setLimit,
  limit = 10,

  setSearch,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (setLimit) {
      setLimit?.(parseInt(limit.toString()) || 10);
    }
  }, [limit, setLimit]);

  return (
    <div className="flex flex-row items-center justify-between">
      {showRowCount && (
        <div className="hidden md:flex flex-row gap-3 items-center">
          <span>Tampilkan</span>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="relative">
              <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
                <input
                  type="text"
                  className="w-12 outline-none"
                  value={limit}
                  onChange={(e) =>
                    setLimit && setLimit(parseInt(e.target.value) || 10)
                  }
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
                          if (setLimit) {
                            setLimit(item);
                          }
                          setOpen(false);
                        }}>
                        <p>{item}</p>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            Number(limit) === item ? "opacity-100" : "opacity-0"
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
      )}

      <div
        className={
          cn(showRowCount ? "flex-1 md:flex-0" : "flex-1 justify-between") +
          " flex flex-row gap-3 items-center w-full md:w-auto"
        }>
        <div
          className={
            cn(showRowCount ? "flex-1" : "flex-0 ") +
            " border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center bg-white"
          }>
          <span className="flex">
            <SearchIcon className="size-4 mr-2" />
          </span>
          <input
            onChange={(e) => setSearch?.(e.target.value)}
            type="text"
            className="outline-none"
            placeholder="cari nama disini"
          />
        </div>
        <Button
          onClick={handleModal}
          className="rounded-full w-10 h-10 md:w-auto md:h-auto px-6 py-6 md:px-7 md:py-4 flex flex-row items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-black">
          <span>
            <FilterSolidIcon className="size-5" />
          </span>
          <span className="hidden md:block">Filter</span>
        </Button>
      </div>
    </div>
  );
};

interface PaginationTableProps {
  page: number;
  setPage: (value: number) => void;
  total: number;
  limit: number;
}

export const PaginationTable: React.FC<PaginationTableProps> = ({
  limit,
  page,
  setPage,
  total,
}) => {
  const totalPages = Math.ceil(total / limit);
  const maxVisiblePages = 4; // jumlah maksimal nomor page yang terlihat

  const getPageNumbers = () => {
    let pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      // Semua halaman ditampilkan jika jumlah halaman <= maxVisiblePages
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Selalu tampilkan halaman pertama
      pages.push(1);

      let startPage = Math.max(2, page - 1);
      let endPage = Math.min(totalPages - 1, page + 1);

      // Jika dekat awal
      if (page <= 2) {
        startPage = 2;
        endPage = maxVisiblePages;
      }

      // Jika dekat akhir
      if (page >= totalPages - 1) {
        startPage = totalPages - (maxVisiblePages - 2);
        endPage = totalPages - 1;
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Selalu tampilkan halaman terakhir
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
      <div>
        <p>
          Menampilkan {(page - 1) * limit + 1} - {Math.min(page * limit, total)}{" "}
          dari {total}
        </p>
      </div>
      <div>
        <Pagination>
          <PaginationContent className="space-x-3">
            <PaginationItem>
              <Button
                size="icon"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50">
                <ChevronLeftIcon />
              </Button>
            </PaginationItem>

            <PaginationItem className="space-x-1">
              {getPageNumbers().map((p, index) =>
                p === "..." ? (
                  <span key={index} className="px-2">
                    ...
                  </span>
                ) : (
                  <PaginationLink
                    key={index}
                    onClick={() => setPage(p as number)}
                    className={
                      cn(
                        page === p && `bg-blue-600 text-white hover:bg-blue-500`
                      ) + " rounded-full"
                    }>
                    {p}
                  </PaginationLink>
                )
              )}
            </PaginationItem>

            <PaginationItem>
              <Button
                size="icon"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50">
                <ChevronRightIcon />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default DataTable;
