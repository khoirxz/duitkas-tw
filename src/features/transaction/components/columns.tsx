import { type ColumnDef } from "@tanstack/react-table";

import { formatRupiah } from "@/lib/formatMoney";

import { SwapIcon } from "@/assets/icons/outline";

import type { TransactionProps, DebsProps } from "../types/transaction";
import { ActionCellWrapper } from "./ActionCellWrapper";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

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
        return <ActionCellWrapper />;
      },
    },
  ];

function statusBadge(status: string) {
  switch (status) {
    case "lunas":
      return (
        <span className="px-3 py-1 rounded-full bg-green-100 text-[#317D2E] text-sm uppercase">
          Lunas
        </span>
      );
    case "berjalan":
      return (
        <span className="px-3 py-1 rounded-full bg-yellow-100 text-[#171717] text-sm uppercase">
          Berjalan
        </span>
      );
    case "jatuh tempo":
      return (
        <span className="px-3 py-1 rounded-full bg-red-100 text-[#7F0000] text-sm uppercase">
          Jatuh Tempo
        </span>
      );
    default:
      return null;
  }
}

function statusAction(amount: number, sisa: number) {
  switch (true) {
    case sisa === 0:
      return <Button className="rounded-full text-white">Arsipkan</Button>;
    case amount > sisa:
      return (
        <div className="flex items-center gap-3">
          <Button className="bg-green-800 text-white rounded-full">
            Bayar
          </Button>
          <Button variant="destructive" className="rounded-full">
            <TrashIcon className="w-5 h-5" />
          </Button>
        </div>
      );
    default:
      return null;
  }
}

export const columnsDebs: ColumnDef<DebsProps>[] = [
  {
    header: "Tanggal Transaksi",
    accessorKey: "tgl_transaksi",
  },
  {
    header: "Jatuh Tempo",
    accessorKey: "jatuh_tempo",
  },
  {
    header: "Akun",
    accessorKey: "akun",
  },
  {
    header: "Mitra",
    accessorKey: "mitra",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      return (
        <div className="flex items-center justify-center w-full">
          {statusBadge(status)}
        </div>
      );
    },
  },
  {
    header: "Keterangan",
    accessorKey: "keterangan",
    cell: ({ row }) => {
      const keterangan = row.getValue<string>("keterangan");
      return (
        <div className="flex items-center justify-center w-full">
          {keterangan.slice(0, 15).trim() +
            (keterangan.length > 15 ? "..." : "")}
        </div>
      );
    },
  },
  {
    header: "Bukti/Nota",
    accessorKey: "bukti",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center w-full">
          <a href={row.getValue("bukti")} className="underline text-indigo-800">
            Lihat Bukti
          </a>
        </div>
      );
    },
  },
  {
    header: "Jumlah",
    accessorKey: "jumlah",
    cell: ({ row }) => {
      const amount = row.getValue<number>("jumlah");
      const sisa = row.original.sisa;
      return (
        <div className="flex flex-col items-end justify-center w-full gap-2">
          <p className="font-semibold">
            {formatRupiah(Number(amount), { useDot: true })}
          </p>
          <span className="flex justify-between items-center w-full font-sm">
            <p className="text-green-400 dark:text-green-700">Sisa</p>
            <p>({formatRupiah(Number(sisa), { useDot: true })})</p>
          </span>
        </div>
      );
    },
  },
  {
    header: "Aksi",
    id: "actions",
    cell: ({ row }) => {
      const amount = row.getValue<number>("jumlah");
      const sisa = row.original.sisa;
      return (
        <div className="flex items-center justify-center w-full">
          {statusAction(amount, sisa)}
        </div>
      );
    },
  },
];
