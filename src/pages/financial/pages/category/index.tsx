import { Link } from "react-router";

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
import { AddCircleSolidIcon } from "@/assets/icons/solid";
import DataTable from "@/components/data-table";
import Layout from "@/layouts/layout";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  SlashIcon,
  SearchIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { columns } from "../../components/columns";
import { useFetchCategories } from "../../hooks/useCategory";

export default function FinancialCategoryListPage() {
  const { data, isLoading } = useFetchCategories("pemasukan");

  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-10">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin/transaction"
                  className="text-blue-700 text-lg">
                  <h1 className="font-semibold text-lg">Perencanaan Data</h1>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-lg">
                  <h1 className="font-semibold text-lg">Data Kategori</h1>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {data?.data.kategori?.length === 0 && (
          <div className="md:text-center">
            <p className="text-sm mb-2">Untuk memulai perencanaan dana.</p>
            <p className="font-semibold">
              Silahkan tambahkan kategori terlebih dahulu.
            </p>
          </div>
        )}

        <div className="mt-7 space-y-10">
          <div className="flex md:flex-row gap-2 md:gap-5 items-center justify-between">
            <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center bg-white">
              <span className="flex bg-white">
                <SearchIcon className="size-4 mr-2" />
              </span>
              <input
                type="text"
                className="outline-none"
                placeholder="cari item disini"
              />
            </div>

            <Link
              className="rounded-full w-auto h-10 md:h-auto px-5 py-6 md:px-5 md:py-4 flex flex-row items-center gap-2 bg-primary text-white text-sm"
              to="/admin/financial/category/form">
              <AddCircleSolidIcon
                className="size-5 fill-white"
                color="inherit"
              />{" "}
              <span className="hidden md:block">Tambah Kategory</span>
            </Link>
          </div>

          {isLoading ? (
            <div className="w-full animate-pulse">
              <div className="h-48 bg-gray-200 rounded-md w-full mb-2"></div>
            </div>
          ) : (
            <DataTable columns={columns} data={data?.data.kategori || []} />
          )}

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
