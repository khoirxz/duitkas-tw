import { Button } from "@/components/ui/button";

import { AddCircleSolidIcon } from "@/assets/icons/solid";
import Layout from "@/layouts/layout";
import DataTable, { TableFilter } from "@/components/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import { dataAccount } from "@/services/api";
import { columns } from "./partials/columns";

import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AccountPage() {
  return (
    <Layout>
      <div className="w-full px-1 md:px-5">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between mt-5">
          <h1 className="font-bold text-xl">Data Akun</h1>

          <Button
            variant="default"
            className="rounded-full px-5 py-3 flex flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700">
            <span>
              <AddCircleSolidIcon color="white" />
            </span>
            Tambah Akun
          </Button>
        </div>

        <div className="mt-7 space-y-10">
          <TableFilter />
          <DataTable columns={columns} data={dataAccount} />

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
    </Layout>
  );
}
