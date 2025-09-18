import { useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router";

import Layout from "@/layouts/layout";

import { columns } from "./components/columns";
import DataTable, {
  PaginationTable,
  TableFilter,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { AddCircleSolidIcon } from "@/assets/icons/solid";
import incomeImg from "@/assets/transaction/pemasukan.png";
import expenseImg from "@/assets/transaction/pengeluaran.png";
import transferImg from "@/assets/transaction/pindahdana.png";
import debtImg from "@/assets/transaction/hutang.png";
import creditImg from "@/assets/transaction/piutang.png";

import { useFetchTransaction } from "./hooks/useTransaction";
import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { XIcon } from "lucide-react";

export default function TransactionPage() {
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [alertVisible, setAlertVisible] = useState<boolean>(true);

  const location = useLocation();
  const state = location.state as { success?: boolean; message?: string };

  const [searchParams] = useSearchParams({ get: ["add"] });

  const pageState = Boolean(Number(searchParams.get("add")));

  const { data: transactions, isLoading } = useFetchTransaction(
    search,
    page,
    limit
  );

  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between mt-5">
          {pageState ? (
            <div>
              <AppBreadcrumb
                data={[
                  {
                    name: "Data Transaksi",
                    link: "/admin/transaction",
                  },
                  {
                    name: "Tambah Data",
                    link: "/admin/transaction?add=1",
                  },
                ]}
              />
            </div>
          ) : (
            <h1 className="font-bold text-xl">Data Transaksi</h1>
          )}

          {transactions?.data.transaksi.length !== 0 && !pageState && (
            <Button
              asChild
              variant="default"
              className="rounded-full px-5 py-3 flex flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700 dark:text-white">
              <Link to={`/admin/transaction?add=1`}>
                <span>
                  <AddCircleSolidIcon color="white" />
                </span>
                Tambah Transaksi
              </Link>
            </Button>
          )}
        </div>

        {state?.success && alertVisible && (
          <Alert className="bg-green-200/50 border-0">
            <AlertDescription className="flex justify-between items-center text-green-700">
              <span>{state.message}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setAlertVisible(false)}>
                <XIcon className="h-4 w-4 text-green-600" />
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {transactions?.data.transaksi.length === 0 ? (
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

        {transactions?.data.transaksi &&
        transactions?.data.transaksi.length <= 0 &&
        search === "" ? (
          <ShowMenu />
        ) : pageState ? (
          <ShowMenu />
        ) : (
          <div className="mt-7 space-y-10">
            <TableFilter
              setSearch={setSearch}
              setLimit={setLimit}
              limit={limit}
            />

            {isLoading ? (
              <div className="w-full animate-pulse">
                <div className="h-48 bg-gray-200 rounded-md w-full mb-2"></div>
              </div>
            ) : (
              <DataTable
                pageSize={limit}
                border={false}
                columns={columns}
                data={transactions?.data.transaksi || []}
              />
            )}

            <PaginationTable
              limit={limit}
              page={page}
              setPage={setPage}
              total={transactions?.data.total || 0}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

function ShowMenu() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
      <Link
        to={"/admin/transaction/form/income"}
        className="flex flex-col items-center gap-2 shadow-lg hover:shadow-2xl transition-all rounded-2xl border p-5 bg-white dark:bg-zinc-800">
        <img src={incomeImg} alt="Income" className="aspect-square w-xs" />

        <p className="font-semibold uppercase">Pemasukan</p>
      </Link>
      <Link
        to={"/admin/transaction/form/expense"}
        className="flex flex-col items-center gap-2 shadow-lg hover:shadow-2xl transition-all rounded-2xl border p-5 bg-white dark:bg-zinc-800">
        <img src={expenseImg} alt="Expense" className="aspect-square w-xs" />
        <p className="font-semibold uppercase">Pengeluaran</p>
      </Link>
      <Link
        to={"/admin/transaction/form/transfer"}
        className="flex flex-col items-center gap-2 shadow-lg hover:shadow-2xl transition-all rounded-2xl border p-5 col-span-2 md:col-span-1 bg-white dark:bg-zinc-800">
        <img src={transferImg} alt="Transfer" className="aspect-square w-xs" />
        <p className="font-semibold uppercase">Pindah dana</p>
      </Link>
      <div className="grid grid-cols-2 md:grid-cols-1 items-center gap-2 col-span-2 md:col-span-1 ">
        <Link
          to={"/admin/transaction/form/debt"}
          className="flex flex-col items-center justify-between gap-2 shadow-lg hover:shadow-2xl transition-all rounded-2xl border p-5 h-full bg-white dark:bg-zinc-800">
          <img src={debtImg} alt="Transfer" className="aspect-square md:h-20" />
          <p className="font-semibold uppercase">Hutang</p>
        </Link>
        <Link
          to={"/admin/transaction/form/credit"}
          className="flex flex-col items-center justify-between gap-2 shadow-lg hover:shadow-2xl transition-all rounded-2xl border p-5 h-full bg-white dark:bg-zinc-800">
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
