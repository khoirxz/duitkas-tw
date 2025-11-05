export const data: {
  id: number;
  name: string;
  value: number;
  type: "percen" | "nominal";
}[] = [
  {
    id: 1,
    name: "Budget 1",
    value: 10000000,
    type: "nominal",
  },
  {
    id: 2,
    name: "Budget 2",
    value: 100,
    type: "percen",
  },
  {
    id: 3,
    name: "Budget 3",
    value: 80,
    type: "percen",
  },
  {
    id: 4,
    name: "Budget 4",
    value: 900000,
    type: "nominal",
  },
  {
    id: 5,
    name: "Budget 5",
    value: 100,
    type: "percen",
  },
];

export type BudgetProps = (typeof data)[number];
