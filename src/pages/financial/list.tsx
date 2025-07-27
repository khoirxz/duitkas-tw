import { useState } from "react";
import { Link } from "react-router";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { AddCircleSolidIcon } from "@/assets/icons/solid";
import DataTable from "@/components/data-table";
import Layout from "@/layouts/layout";
import { ChevronRightIcon, ChevronLeftIcon, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { columns } from "./partials/column";
import { data, type TableProps } from "./data";

export default function FinancialListPage() {
  const [newData, setNewData] = useState<TableProps[]>(data);

  // Toggles data
  const toggleData = () => {
    setNewData((prevData) => (prevData.length === data.length ? [] : data));
  };

  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between mt-5">
          <h1 className="font-bold text-xl">Perencanaan Dana</h1>
        </div>

        {newData.length === 0 && (
          <div className="text-center">
            <p className="text-sm">Untuk memulai perencanaan dana.</p>
            <p className="font-semibold">
              Silahkan tambahkan kategori terlebih dahulu.
            </p>
          </div>
        )}

        <div className="mt-7 space-y-10">
          <div className="flex flex-col md:flex-row gap-3 items-center w-full md:w-auto justify-between">
            <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
              <button className="flex bg-white">
                <SearchIcon className="size-4 mr-2" />
              </button>
              <input
                type="text"
                className="outline-none"
                placeholder="cari item disini"
              />
            </div>
            <Button
              asChild
              variant="default"
              className="rounded-full px-5 py-3 flex flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700">
              <Link to="/admin/financial/form/add">
                <span>
                  <AddCircleSolidIcon color="white" />
                </span>
                Tambah Kategori
              </Link>
            </Button>
          </div>

          <DataTable columns={columns} data={newData} />

          <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
            <div>
              <p>Menampilkan 1 - 10 dari 10</p>
            </div>
            <div>
              <Pagination>
                <PaginationContent className="space-x-3">
                  <PaginationItem>
                    <Button
                      size="icon"
                      className="rounded-full bg-blue-600 hover:bg-blue-500">
                      <ChevronLeftIcon />
                    </Button>
                  </PaginationItem>
                  <PaginationItem className="space-x-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <PaginationLink
                        key={index}
                        href="#"
                        className={
                          cn(
                            index === 0 &&
                              `bg-blue-600 text-white hover:bg-blue-500`
                          ) + " rounded-full"
                        }>
                        {index + 1}
                      </PaginationLink>
                    ))}
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      size="icon"
                      className="rounded-full bg-blue-600 hover:bg-blue-500">
                      <ChevronRightIcon />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 bg-primary p-4 shadow-md">
        <Button onClick={toggleData} className="ml-2">
          Toggle Data
        </Button>
      </div>
    </Layout>
  );
}
