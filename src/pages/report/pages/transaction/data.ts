export interface dataProps {
  id: number;
  type: 0 | 1 | 2 | 3; // 0: Pemasukan, 1: Pengeluaran, 2: Piutang, 3: Hutang - Lunas
  description: string;
  amount: number;
  date: string;
}

export const data: dataProps[] = [
  {
    id: 1,
    type: 0,
    description: "Pemasukan 1",
    amount: 100000,
    date: "2023-01-01",
  },
  {
    id: 2,
    type: 1,
    description: "Pengeluaran 1",
    amount: 50000,
    date: "2023-01-02",
  },
  {
    id: 3,
    type: 2,
    description: "Piutang 1",
    amount: 200000,
    date: "2023-01-03",
  },
  {
    id: 4,
    type: 3,
    description: "Hutang - Lunas 1",
    amount: 150000,
    date: "2023-01-04",
  },
  {
    id: 5,
    type: 0,
    description: "Pemasukan 2",
    amount: 300000,
    date: "2023-01-05",
  },
  {
    id: 6,
    type: 1,
    description: "Pengeluaran 2",
    amount: 80000,
    date: "2023-01-06",
  },
  {
    id: 7,
    type: 2,
    description: "Piutang 2",
    amount: 120000,
    date: "2023-01-07",
  },
  {
    id: 8,
    type: 3,
    description: "Hutang - Lunas 2",
    amount: 90000,
    date: "2023-01-08",
  },
  {
    id: 9,
    type: 3,
    description: "Hutang - Lunas 2",
    amount: 90000,
    date: "2023-01-08",
  },
];
