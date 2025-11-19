import { useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router";

import Layout from "@/layouts/layout";

import DataTable, {
  PaginationTable,
  TableFilter,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AppBreadcrumb } from "@/components/app-breadcrumb";

import { columnsDebs } from "../../components/columns";
import { ModalFilterDebt } from "../../components/modaFilter";

import { AddCircleSolidIcon } from "@/assets/icons/solid";
import debtImg from "@/assets/transaction/hutang.png";
import creditImg from "@/assets/transaction/piutang.png";

import { useFetchTransaction } from "../../hooks/useTransaction";
import { BanknoteArrowDown, BanknoteArrowUp, XIcon } from "lucide-react";
import { DebsData } from "../../data";
import { cn } from "@/lib/utils";

export default function DeptCreditCredit() {
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [alertVisible, setAlertVisible] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false); // Modal Filter
  const [switchTable, setSwitchTable] = useState<boolean>(true);

  const location = useLocation();
  const state = location.state as { success?: boolean; message?: string };

  const [searchParams] = useSearchParams({ get: ["add"] });

  const pageState = Number(searchParams.get("add"));

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
                    link: "/admin/transaction/dept-credit",
                  },
                  {
                    name: "Tambah Data",
                    link: "/admin/transaction/dept-credit?add=1",
                  },
                ]}
              />
            </div>
          ) : (
            <h1 className="font-bold text-xl">Hutang & Piutang</h1>
          )}

          <div className="flex items-center">
            <div className="flex rounded-full overflow-hidden border border-blue-700 mr-4">
              <Button
                onClick={() => setSwitchTable(true)}
                className={
                  cn(
                    switchTable
                      ? "bg-blue-700 dark:text-white"
                      : "bg-transparent dark:text-white"
                  ) + " rounded-full"
                }>
                <BanknoteArrowDown className="w-5 h-5 mr-2" />
                Hutang
              </Button>
              <Button
                onClick={() => setSwitchTable(false)}
                className={
                  cn(
                    !switchTable
                      ? "bg-blue-700 dark:text-white"
                      : "bg-transparent dark:text-white"
                  ) + " rounded-full"
                }>
                <BanknoteArrowUp className="w-5 h-5 mr-2" />
                Piutang
              </Button>
            </div>

            {transactions?.data.transaksi.length !== 0 && !pageState && (
              <Button
                asChild
                variant="default"
                className="rounded-full px-5 py-3 flex flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700 dark:text-white">
                <Link to={`/admin/transaction/debt-credit?add=1`}>
                  <span>
                    <AddCircleSolidIcon color="white" />
                  </span>
                  Tambah Transaksi
                </Link>
              </Button>
            )}
          </div>
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

        {transactions?.data.transaksi.length == 0 ? (
          <div className="text-center">
            <p className="text-sm">Belum ada transaksi saat ini.</p>
            <p className="font-semibold">
              Silahkan pilih jenis transaksi anda.
            </p>
          </div>
        ) : pageState ? (
          <div className="text-center">
            <p className="text-sm">Untuk menambahkan detail transaksi.</p>
            <p className="font-semibold">Silahkan pilih jenis transaksi.</p>
          </div>
        ) : null}

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
              handleModal={() => setOpen(true)}
            />

            {isLoading ? (
              <div className="w-full animate-pulse">
                <div className="h-48 bg-gray-200 rounded-md w-full mb-2"></div>
              </div>
            ) : (
              <DataTable
                pageSize={limit}
                border={false}
                columns={columnsDebs}
                data={DebsData}
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
      <ModalFilterDebt open={open} setOpen={setOpen} />
    </Layout>
  );
}

function ShowMenu() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 my-10">
      <Link
        to={"/admin/transaction/form/debt"}
        className="flex flex-col items-center gap-2 shadow-lg hover:shadow-2xl transition-all rounded-2xl border p-5 bg-white dark:bg-zinc-800">
        <img src={debtImg} alt="Income" className="aspect-square w-xs" />
        <p className="font-semibold uppercase">Hutang</p>
      </Link>
      <Link
        to={"/admin/transaction/form/credit"}
        className="flex flex-col items-center gap-2 shadow-lg hover:shadow-2xl transition-all rounded-2xl border p-5 bg-white dark:bg-zinc-800">
        <img src={creditImg} alt="Expense" className="aspect-square w-xs" />
        <p className="font-semibold uppercase">Piutang</p>
      </Link>
    </div>
  );
}
