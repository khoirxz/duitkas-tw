import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";

import Layout from "@/layouts/layout";
import { PaginationTable, TableFilter } from "@/components/data-table";
import NotaImg from "@/assets/report/nota.png";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { useFetchNote } from "../../hooks/useReport";

export default function ReportTransactionPage() {
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(6);
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useFetchNote({
    akun: search,
    jenis_transaksi: "",
    jumlah_min: "",
    jumlah_max: "",
    limit: limit.toString(),
    page: page.toString(),
  });

  return (
    <Layout>
      <div className="w-full p-1 md:p-5 space-y-7">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between">
          <h1 className="font-bold text-xl">Laporan Nota/Bukti Transfer</h1>

          <Button
            variant="default"
            className="rounded-full px-5 py-3 flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700 hidden md:flex">
            <span>
              <PrinterIcon color="white" />
            </span>
            Cetak
          </Button>
        </div>

        <div className="space-y-10 my-10">
          <TableFilter
            setLimit={setLimit}
            limit={limit}
            setSearch={setSearch}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full h-32 bg-gray-200 animate-pulse rounded-2xl"></div>
                ))
              : data?.data.transaksi.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow relative">
                    <div className="relative">
                      <Badge
                        className={cn(
                          item.kategori === "baru"
                            ? "bg-green-200 text-green-800"
                            : item.kategori === "Pembayaran"
                            ? "bg-red-200 text-red-800"
                            : item.kategori === "Dikasih"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-gray-200 text-gray-800",
                          "absolute top-2 right-2 text-sm px-3 py-1 rounded-lg z-20"
                        )}>
                        {item.kategori === "baru"
                          ? "Pemasukan"
                          : item.kategori === "Pembayaran"
                          ? "Pengeluaran"
                          : item.kategori === "Dikasih"
                          ? "Piutang"
                          : "Hutang - Lunas"}
                      </Badge>
                      <img
                        src={NotaImg}
                        alt="Invoice"
                        className="w-full h-40 object-cover rounded-t-2xl"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black opacity-20 rounded-t-2xl"></div>
                    </div>
                    <div className="p-5 border rounded-b-2xl shadow hover:shadow-lg transition-shadow">
                      <div className="flex flex-row justify-between items-center">
                        <h2 className="text-sm">{item.keterangan}</h2>
                        <p className="text-sm font-semibold">
                          Rp {item.jumlah.toLocaleString()}
                        </p>
                      </div>

                      <p className="text-xs mt-5 text-zinc-500">
                        {item.tanggal}
                      </p>
                    </div>
                  </div>
                ))}
          </div>

          <PaginationTable
            limit={limit}
            page={page}
            setPage={setPage}
            total={data?.data.total || 0}
          />
        </div>
      </div>
    </Layout>
  );
}
