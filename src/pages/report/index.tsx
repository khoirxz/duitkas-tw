import { useState } from "react";

import Layout from "@/layouts/layout";
import DataTable, {
  PaginationTable,
  TableFilter,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/textField";
import { FilterModal } from "@/components/filter-modal";
import {
  PrinterIcon,
  FilterIcon,
  CalendarIcon,
  WalletIcon,
  TagIcon,
} from "lucide-react";

import { columns } from "./components/columns";
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
      <ModalFilter open={open} setOpen={setOpen} />
    </Layout>
  );
}

type ModalFilterProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

function ModalFilter({ open, setOpen }: ModalFilterProps) {
  const [tabs, setTabs] = useState<number>(0);

  return (
    <FilterModal
      open={open}
      setOpen={setOpen}
      title="Filter Penampilan Transaksi">
      <div className="bg-white p-5 space-y-5 font-public relative overflow-auto md:overflow-hidden">
        <div className="flex flex-nowrap justify-start gap-3 w-2xl">
          <TabHeader
            title="Rentan Waktu"
            tabs={tabs}
            setTabs={setTabs}
            number={1}
          />
          <TabHeader title="Harian" tabs={tabs} setTabs={setTabs} number={2} />
          <TabHeader title="Bulanan" tabs={tabs} setTabs={setTabs} number={3} />
          <TabHeader title="Tahunan" tabs={tabs} setTabs={setTabs} number={4} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 bg-white p-5">
        {tabs === 1 ? (
          <InputTime />
        ) : tabs === 2 ? (
          <InputDaily />
        ) : tabs === 3 ? (
          <InputMonthly />
        ) : tabs === 4 ? (
          <InputYears />
        ) : null}

        <div className="col-span-2 md:col-span-1">
          <TextField
            label="Akun yang digunakan"
            placeholder="Atas nama Rekening"
            icon={<WalletIcon className="size-4 text-primary" />}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <TextField
            label="Jenis Transaksi"
            placeholder="Jenis Transaksi"
            icon={<TagIcon className="size-4 text-primary" />}
          />
        </div>

        <div className="col-span-2">
          <TextField
            label="Kategori"
            placeholder="Katrgori"
            icon={<TagIcon className="size-4 text-primary" />}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <TextField
            label="Nominal Minimum"
            placeholder="0"
            icon={
              <span className="text-sm font-semibold text-primary">Rp.</span>
            }
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <TextField
            label="Nominal Maksimum"
            placeholder="0"
            icon={
              <span className="text-sm font-semibold text-primary">Rp.</span>
            }
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 justify-end items-center bg-blue-200 py-2 px-5 rounded-b-2xl">
        <Button
          className="rounded-full px-10 bg-transparent text-indigo-600"
          onClick={() => setOpen(false)}>
          Batal
        </Button>
        <Button className="rounded-full w-30 py-5 bg-blue-700 text-white">
          <FilterIcon className="size-4 mr-1" />
          Filter
        </Button>
      </div>
    </FilterModal>
  );
}

interface TabHeaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  tabs: number;
  setTabs: React.Dispatch<React.SetStateAction<number>>;
  number: number;
}

function TabHeader({ title, tabs, setTabs, number, ...props }: TabHeaderProps) {
  const handleTabs = (index: number) => {
    if (index === tabs) {
      setTabs(0);
      return;
    }
    setTabs(index);
  };

  return (
    <button
      onClick={() => handleTabs(number)}
      className={`${
        tabs === number ? "bg-blue-500 text-white" : ""
      } rounded-full uppercase font-semibold border-2 border-blue-500 text-sm py-2 w-[150px] text-center`}
      {...props}>
      {title}
    </button>
  );
}

function InputTime() {
  return (
    <>
      <div className="col-span-2 md:col-span-1">
        <TextField
          label="Tanggal Awal"
          placeholder="Tanggal Awal"
          icon={<CalendarIcon className="size-4 text-primary" />}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <TextField
          label="Tanggal Akhir"
          placeholder="Tanggal Akhir"
          icon={<CalendarIcon className="size-4 text-primary" />}
        />
      </div>
    </>
  );
}

function InputDaily() {
  return (
    <div className="col-span-2">
      <TextField
        label="Tanggal"
        placeholder="Tanggal"
        icon={<CalendarIcon className="size-4 text-primary" />}
      />
    </div>
  );
}

function InputMonthly() {
  return (
    <>
      <div className="col-span-2 md:col-span-1">
        <TextField
          label="Bulan"
          placeholder="Bulan"
          icon={<CalendarIcon className="size-4 text-primary" />}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <TextField
          label="Tahun"
          placeholder="Tahun"
          icon={<CalendarIcon className="size-4 text-primary" />}
        />
      </div>
    </>
  );
}

function InputYears() {
  return (
    <div className="col-span-2">
      <TextField
        label="Tahun"
        placeholder="Tahun"
        icon={<CalendarIcon className="size-4 text-primary" />}
      />
    </div>
  );
}
