export interface SettingProps {
  error: boolean;
  message: string;
  data: Data[];
}

export interface Data {
  id_perusahaan: string;
  nama_perusahaan: string;
  identitas: string;
  nama_direktur: string;
  jenis_usaha: string;
  kota: string;
  provinsi: string;
  alamat: string;
  kontak: string;
  email: string;
  verified: string;
  token: string;
  masa_aktif: string;
  tgl_daftar: string;
  kode_promo: string;
  status: string;
  fraud: string;
  date_update: string;
}
