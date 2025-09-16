import { type ColumnDef } from "@tanstack/react-table";

import { formatRupiah } from "@/lib/formatMoney";
import { SwapIcon } from "@/assets/icons/outline";
import type { TransaksiProps } from "../types/report";

export const columns: ColumnDef<TransaksiProps["transaksi"]["0"]>[] = [
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2 px-3">
          <p>Tanggal Transaksi</p>
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
      <span className="inline-block w-full px-3 py-4">
        {row.getValue("tanggal")}
      </span>
    ),
    accessorKey: "tanggal",
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2">
          <p>Nama Akun</p>
          <button
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            <SwapIcon width={16} height={16} color="#1976D2" />
          </button>
        </div>
      );
    },
    accessorKey: "akun",
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
    accessorKey: "jenis_transaksi",
  },
  {
    header: () => {
      return <div className="flex flex-row items-center gap-2">Keterangan</div>;
    },
    accessorKey: "keterangan",
    cell: ({ row }) => {
      return (
        <span className="inline-block w-full">
          {(row.getValue("keterangan") as string).slice(0, 15) + "..."}
        </span>
      );
    },
  },
  {
    header: () => {
      return (
        <div className="flex flex-row items-center gap-2">
          <p>Nota</p>
        </div>
      );
    },
    accessorKey: "bukti",
    cell: ({ row }) => {
      return (
        <span className="text-right inline-block w-full">
          <a href={row.getValue("bukti")} className="underline text-indigo-800">
            Lihat Bukti
          </a>
        </span>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row justify-end items-center gap-2 px-3">
          <p>Saldo Awal</p>
          <button
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            <SwapIcon width={16} height={16} color="#1976D2" />
          </button>
        </div>
      );
    },
    accessorKey: "jumlah",
    cell: ({ row }) => {
      const amount = row.getValue<number>("jumlah");
      return (
        <span className="text-right inline-block w-full px-3">
          {formatRupiah(amount)}
        </span>
      );
    },
  },
];
