export interface SettingProps {
  error: boolean;
  message: string;
  data: {
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
  }[];
}

export interface UserSettingProps {
  error: boolean;
  message: string;
  data: {
    user: {
      id_user: string;
      username: string;
      role: string;
      id_kantor: string;
      date_update: string;
      nama: string;
      kode: string;
      tipe: string;
      date_add: string;
      an: string;
      nama_kantor: string;
      kode_kantor: string;
    }[];
    kantor: {
      id_kantor: string;
      nama: string;
      kode: string;
      tipe: string;
      id_perusahaan: string;
      date_add: string;
      date_update: string;
    }[];
    akun_kas: {
      id_akun_bank: string;
      an: string;
    }[];
  };
}

export interface UserDetailSettingsProps {
  id_user: string | null;
  id_perusahaan: string | null;
  username: string | null;
  password: string | null;
  role: string | null;
  id_kantor: string | null;
  date_update: string | null;
  an: string[];
}

export interface OfficeSettingsProps {
  error: boolean;
  message: string;
  data: {
    id_kantor: string;
    nama: string;
    kode: string;
    tipe: string;
    id_perusahaan: string;
    date_add: string;
    date_update: string;
  }[];
}

export interface OfficeDetailSettingsProps {
  id_kantor: string;
  nama: string;
  kode: string;
  tipe: string;
  id_perusahaan: string;
  date_add: string;
  date_update: string;
}
