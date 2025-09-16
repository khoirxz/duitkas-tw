import { PaginationProps } from "@/types/response";

// interface untuk laporan keuangan dan bukti/transaksi
export interface TransaksiProps extends PaginationProps {
  transaksi: {
    id: string;
    tanggal: string;
    akun: string;
    jenis_transaksi: string;
    kategori: string;
    keterangan: string;
    bukti: string;
    jumlah: string;
  }[];
}
