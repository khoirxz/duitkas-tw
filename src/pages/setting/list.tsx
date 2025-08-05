import DataTable from "@/components/data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import Layout from "@/layouts/layout";
import { SlashIcon } from "lucide-react";
import { OfficeColumns, UserColumns } from "./partials/columns";
import { OfficesData, UsersData } from "./data";
import { AddCircleSolidIcon } from "@/assets/icons/solid";

export default function SettingListPage() {
  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin/financial"
                  className="text-blue-700 text-lg font-semibold">
                  Perencanaan Dana
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin/financial/form"
                  className="text-lg font-semibold">
                  Tambah Perencanaan Dana
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="md:text-center">
          <p className="text-sm mb-2">Untuk menggunakan duitkas.</p>
          <p className="font-semibold">Silahkan tambahkan akun pengguna.</p>
        </div>

        <div className="mt-7 space-y-10">
          <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
            <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center w-f">
              <button className="flex bg-white">
                <SearchIcon className="size-4 mr-2" />
              </button>
              <input
                type="text"
                className="outline-none"
                placeholder="cari item disini"
              />
            </div>

            <Button className="rounded-full h-10 w-32  md:h-auto px-10  py-6 md:px-7 md:py-4 flex flex-row items-center gap-2">
              <AddCircleSolidIcon
                className="size-5 fill-white"
                color="inherit"
              />{" "}
              Tambah
            </Button>
          </div>
          <DataTable
            columns={OfficeColumns}
            data={OfficesData}
            border={false}
          />

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

        <div className="mt-20 space-y-10">
          <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
            <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center w-f">
              <button className="flex bg-white">
                <SearchIcon className="size-4 mr-2" />
              </button>
              <input
                type="text"
                className="outline-none"
                placeholder="cari item disini"
              />
            </div>

            <Button className="rounded-full h-10 w-32  md:h-auto px-10  py-6 md:px-7 md:py-4 flex flex-row items-center gap-2">
              <AddCircleSolidIcon
                className="size-5 fill-white"
                color="inherit"
              />{" "}
              Tambah
            </Button>
          </div>
          <DataTable columns={UserColumns} data={UsersData} border={false} />

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
