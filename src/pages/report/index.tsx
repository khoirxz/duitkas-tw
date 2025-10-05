import { useState } from "react";

import DataTable, {
  PaginationTable,
  TableFilter,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import Layout from "@/layouts/layout";
import { PrinterIcon } from "lucide-react";

import { columns } from "./components/columns";
import { FilterModal } from "@/components/filter-modal";

import { useFetchReport } from "./hooks/useReport";
import TransactionChart from "../dashboard/components/transactionChart";
import { useDashboard } from "../dashboard/hooks/useDashboard";
import type { DashboardProps } from "../dashboard/types/dashboard";

export default function ReportPage() {
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  // hooks
  const {
    data: dataReport,
    isFetching,
    isLoading,
  } = useFetchReport({
    akun: search,
    jenis_transaksi: "",
    jumlah_min: "",
    jumlah_max: "",
    limit: limit.toString(),
    page: page.toString(),
  });
  const { data } = useDashboard(
    new Date().getMonth() + 1,
    new Date().getFullYear()
  );

  const calculateIncomeCategory = (
    pemasukan_terbaru: DashboardProps["data"]["pemasukan_terbaru"]
  ) => {
    return pemasukan_terbaru.reduce((acc, item) => {
      // cek apakah kategori sudah ada di acc
      const existing = acc.find((x) => x.nama === item.nama_kategori);

      if (existing) {
        existing.jumlah += item.jumlah; // tambah jumlah
        existing.total_transaksi += 1; // tambah jumlah transaksi
      } else {
        acc.push({
          nama: item.nama_kategori,
          jumlah: item.jumlah,
          warna: item.warna,
          total_transaksi: 1,
        });
      }

      return acc;
    }, [] as { nama: string; jumlah: number; warna: string; total_transaksi: number }[]);
  };

  const resultPemasukan = data?.data.pemasukan_terbaru
    ? calculateIncomeCategory(data.data.pemasukan_terbaru)
    : [];

  const resultPengeluaran = data?.data.pengeluaran_terbaru
    ? calculateIncomeCategory(data.data.pengeluaran_terbaru)
    : [];

  const handleFilter = () => {
    setOpen(true);
  };

  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between mt-5">
          <h1 className="font-bold text-xl">Laporan Keuangan</h1>

          <Button
            variant="default"
            className="rounded-full px-5 py-3 flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700 hidden md:flex">
            <span>
              <PrinterIcon color="white" />
            </span>
            Cetak
          </Button>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-5">
          <div className="space-y-10 flex-1">
            <Button
              variant="default"
              className="rounded-full px-5 py-3 flex md:hidden flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700 dark:text-white">
              <span>
                <PrinterIcon color="white" />
              </span>
              Cetak
            </Button>

            <TableFilter
              handleModal={handleFilter}
              setLimit={setLimit}
              setSearch={setSearch}
              limit={limit}
            />

            {isFetching && isLoading ? (
              <div className="w-full animate-pulse">
                <div className="h-48 bg-gray-200 rounded-md w-full mb-2"></div>
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={dataReport?.data.transaksi || []}
                pageSize={10}
                border={false}
              />
            )}

            <PaginationTable
              limit={limit}
              page={page}
              setPage={setPage}
              total={dataReport?.data.total || 0}
            />
          </div>
          <div>
            <div className="rounded-3xl p-5 w-full space-y-5 shadow-xl border min-w-64 bg-white dark:bg-zinc-800">
              <TransactionChart
                data={{
                  pemasukan: {
                    total: data?.data.pemasukan_bulan_ini || 0,
                    data: resultPemasukan,
                  },
                  pengeluaran: {
                    total: data?.data.pengeluaran_bulan_ini || 0,
                    data: resultPengeluaran,
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <FilterModal open={open} setOpen={setOpen} />
    </Layout>
  );
}
