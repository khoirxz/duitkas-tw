export interface OfficesTableProps {
  id: number;
  name: string;
  type: "utama" | "cabang";
}

export interface UsersTableProps {
  id: number;
  username: string;
  access: Array<0 | 1 | 2>;
  office: string;
}

export const OfficesData: OfficesTableProps[] = [
  {
    id: 1,
    name: "PT. Duitkas",
    type: "utama",
  },
  {
    id: 2,
    name: "Duitkas KC",
    type: "cabang",
  },
];

export const UsersData: UsersTableProps[] = [
  {
    id: 1,
    username: "demos",
    access: [0, 1, 2],
    office: "PT. Duitkas",
  },
  {
    id: 2,
    username: "admindemos",
    access: [0, 1],
    office: "Duitkas KC",
  },
  {
    id: 3,
    username: "opdemos",
    access: [0, 1],
    office: "Duitkas KC",
  },
];
