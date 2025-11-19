import type { ResponseProps } from "@/types/response";

export interface TransactionProps extends ResponseProps {
  data: {
    transaksi: Transaksi[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface Transaksi {
  id: string;
  tanggal: string;
  akun: string;
  jenis_transaksi: string;
  kategori: string;
  keterangan: string;
  bukti: string;
  jumlah: string;
}

export interface CategoryProps extends ResponseProps {
  data: {
    kategori: Kategori[];
  };
}
export interface Kategori {
  id_kategori: string;
  nama_kategori: string;
  warna: string;
}

export interface DebsProps {
  id: number;
  tgl_transaksi: string;
  jatuh_tempo: string;
  akun: string;
  mitra: string;
  status: "lunas" | "berjalan" | "jatuh tempo";
  keterangan: string;
  bukti: string;
  jumlah: number;
  sisa: number;
}
