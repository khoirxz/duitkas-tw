import ReactApexChart from "react-apexcharts";

import { UpSquareIcon } from "@/assets/icons/outline";

export default function SummaryChart() {
  const salesData = [
    { id: 1, month: "Jan", income: 100000, expenses: 60000 },
    { id: 2, month: "Feb", income: 100000, expenses: 35000 },
    { id: 3, month: "Mar", income: 180000, expenses: 45000 },
    { id: 4, month: "Apr", income: 90000, expenses: 20000 },
    { id: 5, month: "May", income: 120000, expenses: 15000 },
    { id: 6, month: "Jun", income: 95000, expenses: 0 },
    { id: 7, month: "Jul", income: 102000, expenses: 65000 },
    { id: 8, month: "Aug", income: 110000, expenses: 50000 },
    { id: 9, month: "Sep", income: 115000, expenses: 40000 },
    { id: 10, month: "Oct", income: 130000, expenses: 50000 },
    { id: 11, month: "Nov", income: 125000, expenses: 35000 },
    { id: 12, month: "Dec", income: 135000, expenses: 40000 },
  ];

  const series = [
    {
      name: "Pemasukan",
      data: salesData.map((d) => d.income),
    },
    {
      name: "Pengeluaran",
      data: salesData.map((d) => -d.expenses), // negatif agar turun ke bawah
    },
  ];

  const options = {
    chart: {
      type: "bar" as const,
      stacked: true,
    },
    colors: ["#2B63E2", "#EF9E4D"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 10,
        borderRadiusApplication: "end" as const,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: salesData.map((d) => d.month),
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `Rp. ${val.toLocaleString()}`,
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `Rp. ${Math.abs(val).toLocaleString()}`,
      },
    },
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-row justify-between">
        <p className="font-semibold">Ringkasan Arus Keuangan</p>

        <span className="bg-green-200 text-green-700 py-1 px-2 rounded-lg font-bold text-sm flex flex-row gap-1 items-center">
          <UpSquareIcon className="w-5 h-5" color="#008236" />
          <span>20.4% dari bulan lalu</span>
        </span>
      </div>

      <div className="w-full">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={505}
        />
      </div>
    </div>
  );
}
