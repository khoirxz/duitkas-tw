import { Link } from "react-router";

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
import { OfficeColumns, UserColumns } from "../../components/columns";

import { AddCircleSolidIcon } from "@/assets/icons/solid";
import {
  useFetchUserSettings,
  useFetchOfficeSettings,
} from "../../hooks/useSetting";

export default function SettingGeneralPage() {
  const { data: userData } = useFetchUserSettings();

  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin/financial"
                  className="text-blue-700 font-semibold text-lg">
                  Konfigurasi Perusahaan
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin/financial/form"
                  className="font-normal text-lg">
                  Data Akun
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {userData?.data.user.length === 0 && (
          <div className="md:text-center">
            <p className="text-sm mb-2">Untuk menggunakan duitkas.</p>
            <p className="font-semibold">Silahkan tambahkan akun pengguna.</p>
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

            <Button
              asChild
              className="rounded-full h-10 w-32  md:h-auto px-10  py-6 md:px-7 md:py-4 flex flex-row items-center gap-2">
              <Link to="/admin/settings/offices/form">
                <AddCircleSolidIcon
                  className="size-5 fill-white"
                  color="inherit"
                />{" "}
                <span className="hidden md:block">Tambah</span>
              </Link>
            </Button>
          </div>

          <OfficeTable />

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
            <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center bg-white">
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
              className="rounded-full h-10 w-32  md:h-auto px-10  py-6 md:px-7 md:py-4 flex flex-row items-center gap-2">
              <Link to="/admin/settings/users/form">
                <AddCircleSolidIcon
                  className="size-5 fill-white"
                  color="inherit"
                />{" "}
                Tambah
              </Link>
            </Button>
          </div>
          <UserTable />

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

const OfficeTable = () => {
  const { data, isLoading } = useFetchOfficeSettings();

  return (
    <div className="mt-7 space-y-10">
      {isLoading ? (
        <div className="w-full animate-pulse">
          <div className="h-48 bg-gray-200 rounded-md w-full mb-2"></div>
        </div>
      ) : (
        <DataTable
          border={false}
          columns={OfficeColumns}
          data={data?.data || []}
        />
      )}
    </div>
  );
};

const UserTable = () => {
  const { data, isLoading } = useFetchUserSettings();

  return (
    <div className="mt-7 space-y-10">
      {isLoading ? (
        <div className="w-full animate-pulse">
          <div className="h-48 bg-gray-200 rounded-md w-full mb-2"></div>
        </div>
      ) : (
        <DataTable
          border={false}
          columns={UserColumns}
          data={data?.data.user || []}
        />
      )}
    </div>
  );
};
