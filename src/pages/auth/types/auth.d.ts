export interface AuthResponseProps {
  perusahaan: Perusahaan;
  user: User;
  token: string;
}

export interface Perusahaan {
  id_perusahaan: string;
  nama_perusahaan: string;
  nama_direktur: string;
  kontak: string;
  email: string;
}

export interface User {
  id_user: string;
  role: string;
}
