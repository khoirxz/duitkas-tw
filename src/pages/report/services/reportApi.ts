import { api } from "@/services/api";
import type { ResponseProps } from "@/types/response";
import type { TransaksiProps } from "../types/report";

export type paramsProps = {
  limit: string;
  page: string;
  akun: string;
  jenis_transaksi: string;
  jumlah_min: string;
  jumlah_max: string;
};

export const fetchAllReport = async ({
  limit,
  page,
  akun,
  jenis_transaksi,
  jumlah_min,
  jumlah_max,
}: paramsProps): Promise<ResponseProps & { data: TransaksiProps }> => {
  const response = await api.get<ResponseProps & { data: TransaksiProps }>(
    "laporan-finansial",
    {
      params: {
        limit,
        page,
        akun,
        jenis_transaksi,
        jumlah_min,
        jumlah_max,
      },
    }
  );
  return response.data;
};

export const fetchAllNote = async ({
  limit,
  page,
  akun,
  jenis_transaksi,
  jumlah_min,
  jumlah_max,
}: paramsProps): Promise<ResponseProps & { data: TransaksiProps }> => {
  const response = await api.get<ResponseProps & { data: TransaksiProps }>(
    "laporan-bukti",
    {
      params: {
        limit,
        page,
        akun,
        jenis_transaksi,
        jumlah_min,
        jumlah_max,
      },
    }
  );
  return response.data;
};
