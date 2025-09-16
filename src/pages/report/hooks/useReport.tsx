import { useQuery } from "@tanstack/react-query";

import {
  fetchAllReport,
  fetchAllNote,
  type paramsProps,
} from "../services/reportApi";
import type { ResponseProps } from "@/types/response";
import type { TransaksiProps } from "../types/report";

export const useFetchReport = ({
  akun,
  limit,
  jenis_transaksi,
  jumlah_max,
  jumlah_min,
  page,
}: paramsProps) => {
  return useQuery<ResponseProps & { data: TransaksiProps }>({
    queryKey: [
      "report",
      akun,
      limit,
      jenis_transaksi,
      jumlah_max,
      jumlah_min,
      page,
    ],
    queryFn: () =>
      fetchAllReport({
        akun,
        limit,
        jenis_transaksi,
        jumlah_min,
        jumlah_max,
        page,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useFetchNote = ({
  akun,
  limit,
  jenis_transaksi,
  jumlah_max,
  jumlah_min,
  page,
}: paramsProps) => {
  return useQuery<ResponseProps & { data: TransaksiProps }>({
    queryKey: [
      "note",
      akun,
      limit,
      jenis_transaksi,
      jumlah_max,
      jumlah_min,
      page,
    ],
    queryFn: () =>
      fetchAllNote({
        akun,
        limit,
        jenis_transaksi,
        jumlah_min,
        jumlah_max,
        page,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
