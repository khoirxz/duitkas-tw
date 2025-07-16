import Layout from "@/layouts/layout";

import ActualBalance from "./partials/actualBalance";
import DebsBalance from "./partials/debsBalance";
import Account from "./partials/account";
import SummaryChart from "./partials/summaryChart";
import TransactionChart from "./partials/transactionChart";

export default function DashboardPage() {
  return (
    <Layout>
      <div className="w-full">
        <div className="flex flex-row items-center px-5 mt-5">
          <h1 className="font-bold text-2xl">Dashboard</h1>
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
