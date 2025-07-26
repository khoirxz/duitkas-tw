import { useState } from "react";
import { Link, useSearchParams } from "react-router";

import Layout from "@/layouts/layout";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { columns, type TableProps } from "./partials/columns";
import DataTable, { TableFilter } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { AddCircleSolidIcon } from "@/assets/icons/solid";
import { ChevronRightIcon, ChevronLeftIcon, SlashIcon } from "lucide-react";
import incomeImg from "@/assets/transaction/pemasukan.png";
import expenseImg from "@/assets/transaction/pengeluaran.png";
import transferImg from "@/assets/transaction/pindahdana.png";
import debtImg from "@/assets/transaction/hutang.png";
import creditImg from "@/assets/transaction/piutang.png";
import { cn } from "@/lib/utils";

import { data } from "./data";

export default function TransactionPage() {
  const [searchParams] = useSearchParams({ get: ["add"] });
  const [newData, setNewData] = useState<TableProps[]>(data);
  const pageState = Boolean(Number(searchParams.get("add")));

  const tonggleData = () => {
    setNewData((prevData) => (prevData.length === data.length ? [] : data));
  };

  console.log();

  return (
    <Layout>
      <div className="w-full p-1 md:p-5 space-y-7">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between mt-5">
          {pageState ? (
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="text-blue-700 text-lg" asChild>
                      <Link to="/admin/transaction">Data Transaksi</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <SlashIcon />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="text-lg">
                      Tambah Data
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          ) : (
            <h1 className="font-bold text-xl">Data Transaksi</h1>
          )}

          {newData.length !== 0 && !pageState && (
            <Button
              asChild
              variant="default"
              className="rounded-full px-5 py-3 flex flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700">
              <Link to={`/admin/transaction?add=1`}>
                <span>
                  <AddCircleSolidIcon color="white" />
                </span>
                Tambah Akun
              </Link>
            </Button>
          )}
        </div>

        {newData.length === 0 ? (
          <div className="text-center">
            <p className="text-sm">Belum ada transaksi saat ini.</p>
            <p className="font-semibold">
              Silahkan pilih jenis transaksi anda.
            </p>
          </div>
        ) : (
          pageState && (
            <div className="text-center">
              <p className="text-sm">Untuk menambahkan detail transaksi.</p>
              <p className="font-semibold">Silahkan pilih jenis transaksi.</p>
            </div>
          )
        )}

        {newData.length <= 0 ? (
          <ShowMenu />
        ) : pageState ? (
          <ShowMenu />
        ) : (
          <div className="mt-7 space-y-10">
            <TableFilter />

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
        )}
      </div>

      <div className="fixed bottom-0 right-0 bg-primary p-4 shadow-md">
        <Button onClick={tonggleData} className="ml-2">
          Toggle Data
        </Button>
      </div>
    </Layout>
  );
}

function ShowMenu() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
      <Link
        to={"/admin/transaction/form?type=income"}
        className="flex flex-col items-center gap-2 shadow-lg hover:shadow-2xl transition-all rounded-2xl border p-5">
        <img src={incomeImg} alt="Income" className="aspect-square w-xs" />

        <p className="font-semibold uppercase">Pemasukan</p>
      </Link>
      <Link
        to={"/admin/transaction/form?type=expense"}
        className="flex flex-col items-center gap-2 shadow-lg hover:shadow-2xl transition-all rounded-2xl border p-5">
        <img src={expenseImg} alt="Expense" className="aspect-square w-xs" />
        <p className="font-semibold uppercase">Pengeluaran</p>
      </Link>
      <Link
        to={"/admin/transaction/form?type=transfer"}
        className="flex flex-col items-center gap-2 shadow-lg hover:shadow-2xl transition-all rounded-2xl border p-5 col-span-2 md:col-span-1">
        <img src={transferImg} alt="Transfer" className="aspect-square w-xs" />
        <p className="font-semibold uppercase">Pindah dana</p>
      </Link>
      <div className="grid grid-cols-2 md:grid-cols-1 items-center gap-2 col-span-2 md:col-span-1 ">
        <Link
          to={"/admin/transaction/form?type=debt"}
          className="flex flex-col items-center justify-between gap-2 shadow-lg hover:shadow-2xl transition-all rounded-2xl border p-5 h-full">
          <img src={debtImg} alt="Transfer" className="aspect-square md:h-20" />
          <p className="font-semibold uppercase">Hutang</p>
        </Link>
        <Link
          to={"/admin/transaction/form?type=credit"}
          className="flex flex-col items-center justify-between gap-2 shadow-lg hover:shadow-2xl transition-all rounded-2xl border p-5 h-full">
          <img
            src={creditImg}
            alt="Transfer"
            className="aspect-square md:h-20"
          />
          <p className="font-semibold uppercase">Piutang</p>
        </Link>
      </div>
    </div>
  );
}
