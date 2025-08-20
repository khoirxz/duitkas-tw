import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import Layout from "@/layouts/layout";

import budgetImg from "@/assets/financial/chart-3d.png";
import golasImg from "@/assets/financial/goal-trophy.png";

export default function FinancialPage() {
  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between mt-5">
          <h1 className="font-bold text-xl">Perencanaan Dana</h1>

          <Button
            asChild
            variant="default"
            className="rounded-full px-5 py-3 flex flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700">
            <Link to="/admin/financial/list">Data Kategori</Link>
          </Button>
        </div>
        {/* Additional content for financial plan page can be added here */}

        <div className="text-center">
          <p className="text-sm">Belum ada perencanaan dana saat ini</p>
          <p className="font-semibold">
            Silahkan pilih tujuan perencanaan anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 md:max-w-4xl md:mx-auto">
          <Link
            to="/admin/financial/form/budget"
            className="flex flex-col gap-3 items-center shadow-lg p-5 rounded-3xl border hover:shadow-2xl transition-shadow bg-white">
            <img
              src={budgetImg}
              alt="Budget"
              className="aspect-square md:w-xs h-36 md:h-auto"
            />

            <h2 className="text-lg font-semibold mt-3">Budget</h2>
          </Link>
          <Link
            to="/admin/financial/form/goals"
            className="flex flex-col gap-3 items-center shadow-lg p-5 rounded-3xl border hover:shadow-2xl transition-shadow bg-white">
            <img
              src={golasImg}
              alt="Goals"
              className="aspect-square md:w-xs h-36 md:h-auto"
            />

            <h2 className="text-lg font-semibold mt-3">Goals</h2>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
