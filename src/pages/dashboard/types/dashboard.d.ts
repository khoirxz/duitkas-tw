import type { ResponseProps } from "@/types/response";

export interface DashboardProps extends ResponseProps {
  data: Data;
}

export interface Data {
  bulan: string;
  target: number;
  pemasukan_bulan_ini: number;
  prosentase: number;
  pengeluaran_bulan_ini: number;
  pengeluaran_terbaru: PengeluaranTerbaru[];
  pemasukan_terbaru: PemasukanTerbaru[];
  total_hutang: number;
  total_piutang: number;
  total_real_balance: number;
  peti_kas_bulan_ini: number;
  budget: Budget[];
  pemasukan_tahun_ini: number[];
  pengeluaran_tahun_ini: number[];
  data_grafik: number[];
  all_bank: AllBank[];
  suplier: Suplier[];
  bank_trend_perbulan: BankTrendPerbulan[];
}

export interface PemasukanTerbaru {
  id_income: number;
  tanggal: string;
  jumlah: number;
  rekening: string;
  nama_kategori: string;
  warna: string;
  keterangan: string;
}

export interface Budget {
  nama_budget: string;
  jumlah_budget: number;
  warna_budget: string;
}

export interface AllBank {
  nama_bank: string;
  nomor_rekening: string;
  atas_nama: string;
  id_akun_bank: number;
  saldo_awal: number;
  total_pemasukan: number;
  total_pengeluaran: number;
}

export interface Suplier {
  id: string;
  suplier: string;
  id_perusahaan: string;
  date_add: string;
}

export interface BankTrendPerbulan {
  bulan: number;
  total_pemasukan: number;
  total_pengeluaran: number;
  saldo_akhir: number;
  persentase_perubahan: number;
}
