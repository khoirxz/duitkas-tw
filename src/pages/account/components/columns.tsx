import { type ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";

import { formatRupiah } from "@/lib/formatMoney";
import { DeleteSolidIcon, EditSolidIcon } from "@/assets/icons/solid";
import { SwapIcon } from "@/assets/icons/outline";
import { Button } from "@/components/ui/button";
import type { AccountProps } from "../types/account";

export const columns: ColumnDef<AccountProps["data"]["akun"]["0"]>[] = [
  {
    header: () => <span className="text-center px-3">No</span>,
    accessorKey: "no",
    cell: ({ row }) => (
      <span className="text-center px-3">{row.index + 1}</span>
    ),
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2 justify-end">
          <p>No Rekening</p>
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
      <span className="text-right inline-block w-full">
        {row.getValue("nomor_rekening")}
      </span>
    ),
    accessorKey: "nomor_rekening",
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2">
          <p>Nama</p>
          <button
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            <SwapIcon width={16} height={16} color="#1976D2" />
          </button>
        </div>
      );
    },
    accessorKey: "atas_nama",
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
    accessorKey: "nama_akun",
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2 justify-end">
          Biaya Administrasi
          <button
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            <SwapIcon width={16} height={16} color="#1976D2" />
          </button>
        </div>
      );
    },
    accessorKey: "administrasi",
    cell: ({ row }) => {
      const amount = row.getValue<number>("administrasi");
      return (
        <span className="text-right inline-block w-full">
          {formatRupiah(Number(amount), { useDot: true })}
        </span>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row justify-end items-center gap-2">
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
    accessorKey: "saldo_awal",
    cell: ({ row }) => {
      const amount = row.getValue<number>("saldo_awal");
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
    cell: ({ row }) => {
      const id = row.original.id_akun_bank;

      return (
        <div className="flex flex-row items-center w-full gap-2 justify-center">
          <Button
            size="icon"
            className="bg-amber-400 hover:bg-amber-400/80 rounded-full"
            asChild>
            <Link to={"form/edit/" + id}>
              <EditSolidIcon width={16} height={16} color="#fff" />
            </Link>
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
