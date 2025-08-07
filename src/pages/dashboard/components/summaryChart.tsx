import ReactApexChart from "react-apexcharts";

import { UpSquareIcon } from "@/assets/icons/outline";

export default function SummaryChart() {
  const salesData = [
    { id: 1, month: "2023-01-01", income: 100000, expenses: 60000 },
    { id: 2, month: "2023-02-01", income: 100000, expenses: 35000 },
    { id: 3, month: "2023-03-01", income: 180000, expenses: 45000 },
    { id: 4, month: "2023-04-01", income: 90000, expenses: 20000 },
    { id: 5, month: "2023-05-01", income: 120000, expenses: 15000 },
    { id: 6, month: "2023-06-01", income: 95000, expenses: 0 },
    { id: 7, month: "2023-07-01", income: 102000, expenses: 65000 },
    { id: 8, month: "2023-08-01", income: 110000, expenses: 50000 },
    { id: 9, month: "2023-09-01", income: 115000, expenses: 40000 },
    { id: 10, month: "2023-10-01", income: 130000, expenses: 50000 },
    { id: 11, month: "2023-11-01", income: 125000, expenses: 35000 },
    { id: 12, month: "2023-12-01", income: 135000, expenses: 40000 },
  ];

  const series = [
    {
      name: "Pemasukan",
      data: salesData.map((d) => d.income),
    },
    {
      name: "Pengeluaran",
      data: salesData.map((d) => -d.expenses),
    },
  ];

  const options = {
    chart: {
      type: "bar" as const,
      stacked: true,
      height: 350,
      zoom: {
        enabled: true,
        type: "x" as const,
        autoScaleYaxis: true,
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        },
      },
    },
    colors: ["#053EBF", "#F98E25"],
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: -1000000,
              to: -1,
              color: "#F98E25", // pengeluaran dominan
            },
            {
              from: 0,
              to: 1000000,
              color: "#053EBF", // pemasukan dominan
            },
          ],
        },
        columnWidth: "60%",
        borderRadius: 10,
        borderRadiusApplication: "end" as const,
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: function (y: number) {
          return `Rp. ${y.toLocaleString()}`;
        },
      },
    },
    xaxis: {
      type: "datetime" as const,
      categories: salesData.map((d) => d.month),
      labels: {
        rotate: -45,
        datetimeUTC: false,
        format: "MMM",
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return `Rp. ${Math.abs(val).toLocaleString()}`;
        },
      },
    },
  };

  return (
    <div className="flex flex-col justify-between h-full space-y-5">
      <div className="flex flex-col md:flex-row items-start md:justify-between gap-3">
        <p className="font-semibold">Ringkasan Arus Keuangan</p>

        <span className="bg-green-200 text-green-700 py-1 px-2 rounded-lg font-bold text-sm flex flex-row gap-1 items-center">
          <UpSquareIcon className="w-5 h-5" color="#008236" />
          <span>20.4% dari bulan lalu</span>
        </span>
      </div>

      <div className="w-full relative">
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
