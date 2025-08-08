import type { ResponseProps, PaginationProps } from "@/types/response";

// Respon dari pengambilan semua data
export interface AccountProps extends ResponseProps {
  error: boolean;
  message: string;
  data: Data;
}

export interface Data extends PaginationProps {
  akun: Akun[];
}

export interface Akun {
  id_bank: number;
  id_akun_bank: number;
  nama_bank: string;
  nomor_rekening: string;
  atas_nama: string;
  nama_akun: string;
  administrasi: number;
  saldo_awal: number;
}

// Respon dari input data
export interface AccountFormProps extends ResponseProps {
  data: {
    id_akun_bank: string;
  };
}
