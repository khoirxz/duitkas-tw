import { Link } from "react-router";
import { Button } from "@/components/ui/button";

import DataTable, { TableFilter } from "@/components/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

import { ChevronRightIcon, ChevronLeftIcon, XIcon } from "lucide-react";
import Layout from "@/layouts/layout";
import { columns } from "./components/columns";

import { AddCircleSolidIcon } from "@/assets/icons/solid";
import { useAccount } from "./hooks/useAccount";

export default function AccountPage() {
  const { isLoading, data } = useAccount();

  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between mt-5">
          <h1 className="font-bold text-xl">Data Akun</h1>

          <Button
            variant="default"
            className="rounded-full px-5 py-3 flex flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700"
            asChild>
            <Link to="/admin/account/form/add">
              <span>
                <AddCircleSolidIcon color="white" />
              </span>
              Tambah Akun
            </Link>
          </Button>
        </div>

        <Alert className="bg-green-200/50 border-0">
          <AlertDescription className="flex justify-between items-center text-green-700">
            Berhasil Menambahkan Akun "TRANSAKSIONAL"
            <Button variant="ghost" size="icon">
              <XIcon className="h-4 w-4 text-green-600" />
            </Button>
          </AlertDescription>
        </Alert>

        <div className="mt-7 space-y-10">
          <TableFilter />

          {isLoading ? (
            <div className="w-full animate-pulse">
              <div className="h-48 bg-gray-200 rounded-md w-full mb-2"></div>
            </div>
          ) : (
            <DataTable
              border={false}
              columns={columns}
              data={data?.data.akun || []}
            />
          )}

          <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
            <div>
              <p>
                Menampilkan 1 - {data?.data.akun.length} dari{" "}
                {data?.data.akun.length}
              </p>
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
