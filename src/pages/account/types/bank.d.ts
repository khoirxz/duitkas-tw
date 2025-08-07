export interface BankProps extends ResponseProps {
  data: Data;
}

export interface Data {
  bank: Bank[];
}

export interface Bank {
  id_bank: string;
  nama_bank: string;
  logo?: string;
}
