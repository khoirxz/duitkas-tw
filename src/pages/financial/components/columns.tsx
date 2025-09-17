import { type ColumnDef } from "@tanstack/react-table";

import { SwapIcon } from "@/assets/icons/outline";

import { ActionCellWrapper } from "./ActionCellWrapper";
import type { Category } from "../types/category";
import type { BudgetProps } from "../types/financial";

export const columns: ColumnDef<Category>[] = [
  {
    header: () => <span className="text-center px-3">No</span>,
    accessorKey: "id",
    cell: ({ row }) => (
      <span className="text-center px-3">{row.index + 1}</span>
    ),
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2 justify-start">
          <p className="text-sm">Nama Kategori</p>
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
    accessorKey: "nama_kategori",
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
    accessorKey: "tipe",
  },
  {
    header: () => {
      return (
        <div className="flex flex-row items-center gap-2">
          <p>Warna</p>
        </div>
      );
    },
    accessorKey: "warna",
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-2">
        <span
          className="inline-block w-5 h-5 rounded-full"
          style={{ backgroundColor: row.getValue("warna") }}
        />
        <p className="text-xs">{row.getValue("warna")}</p>
      </div>
    ),
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
      const id = row.original.id_kategori;
      return <ActionCellWrapper id={id} />;
    },
  },
];

export const columnsFinancial: ColumnDef<BudgetProps>[] = [
  {
    header: () => <span className="text-center px-3">No</span>,
    accessorKey: "id_budget",
    cell: ({ row }) => (
      <span className="text-center px-3">{row.index + 1}</span>
    ),
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2 justify-start">
          <p className="text-sm">Nama</p>
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
    accessorKey: "nama_budget",
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2 justify-start">
          <p className="text-sm">Tanggal</p>
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
    accessorKey: "date_update",
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2 justify-start">
          <p className="text-sm">Warna</p>
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
    accessorKey: "warna_budget",
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-2">
        <span
          className="inline-block w-5 h-5 rounded-full"
          style={{ backgroundColor: row.getValue("warna_budget") }}
        />
        <p className="text-xs">{row.getValue("warna_budget")}</p>
      </div>
    ),
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2 justify-start">
          <p className="text-sm">Jumlah</p>
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
    accessorKey: "jumlah_budget",
  },
];
