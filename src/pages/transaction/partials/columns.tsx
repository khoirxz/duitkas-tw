import { type ColumnDef } from "@tanstack/react-table";

import { formatRupiah } from "@/lib/formatMoney";
import { DeleteSolidIcon, EditSolidIcon } from "@/assets/icons/solid";
import { SwapIcon } from "@/assets/icons/outline";
import { Button } from "@/components/ui/button";

export interface TableProps {
  id: number;
  date: string;
  account: string;
  type: string;
  category: string;
  note: string;
  file: string;
  amount: number;
}

export const columns: ColumnDef<TableProps>[] = [
  {
    header: ({ column }) => (
      <div className="flex flex-row items-center gap-2">
        <p>Tanggal Transaksi</p>
        <button
          className="bg-transparent hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <span className="w-5 h-5 flex items-center justify-center">
            <SwapIcon
              style={{
                width: "16px",
                height: "16px",
              }}
              color="#1976D2"
            />
          </span>
        </button>
      </div>
    ),
    accessorKey: "date",
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2">
          <p>Akun</p>
          <button
            className="bg-transparent hover:bg-transparent"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            <span className="w-5 h-5 flex items-center justify-center">
              <SwapIcon
                style={{
                  width: "16px",
                  height: "16px",
                }}
                color="#1976D2"
              />
            </span>
          </button>
        </div>
      );
    },
    cell: ({ row }) => (
      <span className="inline-block w-full">{row.getValue("account")}</span>
    ),
    accessorKey: "account",
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2">
          <p>Jenis Transaksi</p>
          <button
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            <SwapIcon width={16} height={16} color="#1976D2" />
          </button>
        </div>
      );
    },
    accessorKey: "type",
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2">
          <p>Kategori</p>
          <button
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            <SwapIcon width={16} height={16} color="#1976D2" />
          </button>
        </div>
      );
    },
    accessorKey: "category",
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2">
          Keterangan
          <button
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            <SwapIcon width={16} height={16} color="#1976D2" />
          </button>
        </div>
      );
    },
    accessorKey: "note",
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row justify-end items-center gap-2">
          <p>Bukti/Nota</p>
          <button
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            <SwapIcon width={16} height={16} color="#1976D2" />
          </button>
        </div>
      );
    },
    accessorKey: "file",
    cell: ({ row }) => {
      return (
        <span className="text-right inline-block w-full">
          <a href={row.getValue("file")} className="underline text-indigo-800">
            Lihat Bukti
          </a>
        </span>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row justify-end items-center gap-2">
          <p>Jumlah</p>
          <button
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            <SwapIcon width={16} height={16} color="#1976D2" />
          </button>
        </div>
      );
    },
    accessorKey: "amount",
    cell: ({ row }) => {
      const amount = row.getValue<number>("amount");
      return (
        <span className="text-right inline-block w-full">
          {formatRupiah(amount, { useDot: true })}
        </span>
      );
    },
  },
  {
    header: () => {
      return (
        <span className="text-center">
          <p>Aksi</p>
        </span>
      );
    },
    id: "actions",
    cell: () => {
      return (
        <div className="flex flex-row items-center w-full gap-2 justify-center">
          <Button
            size="icon"
            className="bg-amber-400 hover:bg-amber-400/80 rounded-full">
            <EditSolidIcon width={16} height={16} color="#fff" />
          </Button>
          <Button
            size="icon"
            className="bg-red-500 hover:bg-red-500/80 rounded-full">
            <DeleteSolidIcon width={16} height={16} color="#fff" />
          </Button>
        </div>
      );
    },
  },
];
