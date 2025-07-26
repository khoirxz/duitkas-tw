import { useState } from "react";
import Layout from "@/layouts/layout";

import { ChevronDown } from "lucide-react";
import { CalendarIcon } from "@/assets/icons/outline";

import ActualBalance from "./partials/actualBalance";
import DebsBalance from "./partials/debsBalance";
import Account from "./partials/account";
import SummaryChart from "./partials/summaryChart";
import TransactionChart from "./partials/transactionChart";

import { DatePicker } from "@/components/date-selector";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <Layout>
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between px-5 mt-5">
          <h1 className="font-bold text-2xl">Dashboard</h1>

          <div className="flex flex-row gap-2">
            <DatePicker
              type="month"
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}>
              <button className="rounded-full bg-white text-black border-blue-300 border flex flex-row items-center justify-between gap-2 px-3.5 py-2 w-full md:w-auto">
                <CalendarIcon className="size-5 mr-1" />
                <span className="flex-1 md:min-w-22 text-left uppercase">
                  {selectedDate?.toLocaleString("id-ID", { month: "long" }) ||
                    "Pilih Bulan"}
                </span>
                <ChevronDown className="w-5 h-5" />
              </button>
            </DatePicker>
            <DatePicker
              type="year"
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}>
              <button className="rounded-full bg-white text-black border-blue-300 border flex flex-row items-center justify-between gap-2 px-3.5 py-2 w-full md:w-auto">
                <CalendarIcon className="size-5 mr-1" />
                <span className="flex-1 md:min-w-22 text-left uppercase">
                  {selectedDate?.toLocaleString("id-ID", { year: "numeric" }) ||
                    "Pilih Bulan"}
                </span>
                <ChevronDown className="w-5 h-5" />
              </button>
            </DatePicker>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 my-6 px-5 md:[grid-template-columns:285px_455px_1fr] md:[grid-template-rows:210px_620px] md:gap-4 md:h-[120vh]">
          {/* Account Card */}
          <div className="md:col-span-1 md:row-start-1 md:col-start-2">
            <ActualBalance />
          </div>

          <div className="md:row-span-2 md:row-start-1 md:col-start-1 md:col-span-1">
            <Account />
          </div>

          <div className="md:col-span-1 md:row-start-1 md:col-start-3">
            <DebsBalance />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:col-span-2 md:row-span-1 md:col-start-2 md:row-start-2">
            <div className="shadow-lg rounded-2xl h-full p-5 border flex flex-col md:col-span-4">
              <SummaryChart />
            </div>

            <div className="shadow-lg rounded-2xl h-full p-5 border flex flex-col md:col-span-2">
              <TransactionChart />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
