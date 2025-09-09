import { type ColumnDef } from "@tanstack/react-table";

import { formatRupiah } from "@/lib/formatMoney";
import { DeleteSolidIcon, EditSolidIcon } from "@/assets/icons/solid";
import { SwapIcon } from "@/assets/icons/outline";
import { Button } from "@/components/ui/button";
import type { TransactionProps } from "../types/transaction";

export const columns: ColumnDef<TransactionProps["data"]["transaksi"]["0"]>[] =
  [
    {
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-2 px-2">
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
      ),
      cell: ({ row }) => (
        <span className="inline-block w-full px-2">
          {row.getValue("tanggal")}
        </span>
      ),
      accessorKey: "tanggal",
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
        <span className="inline-block w-full">{row.getValue("akun")}</span>
      ),
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
      accessorKey: "kategori",
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
      accessorKey: "keterangan",
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
      accessorKey: "bukti",
      cell: ({ row }) => {
        return (
          <span className="text-right inline-block w-full">
            <a
              href={row.getValue("bukti")}
              className="underline text-indigo-800">
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
      accessorKey: "jumlah",
      cell: ({ row }) => {
        const amount = row.getValue<string>("jumlah");
        return (
          <span className="text-right inline-block w-full">
            {formatRupiah(Number(amount), { useDot: true })}
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
