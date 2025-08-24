import { type ColumnDef } from "@tanstack/react-table";

import { DeleteSolidIcon, EditSolidIcon } from "@/assets/icons/solid";
import { SwapIcon } from "@/assets/icons/outline";
import { Button } from "@/components/ui/button";

import type { OfficeSettingsProps, UserSettingProps } from "../types/setting";
import ActionCell from "@/components/ActionCell";

export const OfficeColumns: ColumnDef<OfficeSettingsProps["data"]["0"]>[] = [
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
          <p className="text-sm">Nama Kantor</p>
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
    accessorKey: "nama",
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2">
          <p>Tipe</p>
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

export const UserColumns: ColumnDef<UserSettingProps["data"]["user"]["0"]>[] = [
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
          <p className="text-sm">Role</p>
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
    accessorKey: "role",
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2">
          <p>Username</p>
          <button
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            <SwapIcon width={16} height={16} color="#1976D2" />
          </button>
        </div>
      );
    },
    accessorKey: "username",
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2">
          <p>Akses Akun Diberikan</p>
          <button
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            <SwapIcon width={16} height={16} color="#1976D2" />
          </button>
        </div>
      );
    },
    accessorKey: "kode",
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center gap-2">
          <p>Kantor</p>
          <button
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            <SwapIcon width={16} height={16} color="#1976D2" />
          </button>
        </div>
      );
    },
    accessorKey: "nama_kantor",
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
      const id = row.original.id_user;

      return <ActionCell id={id} linkEdit="/admin/settings/users/form" />;
    },
  },
];
