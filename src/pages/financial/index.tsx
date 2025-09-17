import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import Layout from "@/layouts/layout";

import DataTable from "@/components/data-table";
import { columnsFinancial } from "./components/columns";
import { useFetchBudget } from "./hooks/useFinancial";

export default function FinancialPage() {
  const { data, isLoading } = useFetchBudget();

  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between mt-5">
          <h1 className="font-bold text-xl">Perencanaan Dana</h1>

          <Button
            asChild
            variant="default"
            className="rounded-full px-5 py-3 flex flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700 dark:text-white">
            <Link to="/admin/financial/category/list">Data Kategori</Link>
          </Button>
        </div>
        {/* Additional content for financial plan page can be added here */}

        {data?.data.length === 0 && !isLoading && (
          <div className="text-center">
            <p className="text-sm">Belum ada perencanaan dana saat ini</p>
            <p className="font-semibold">
              Silahkan pilih tujuan perencanaan anda.
            </p>
          </div>
        )}

        <div className="mt-7 space-y-10">
          {isLoading ? (
            <div className="w-full animate-pulse">
              <div className="h-48 bg-gray-200 rounded-md w-full mb-2"></div>
            </div>
          ) : (
            <DataTable columns={columnsFinancial} data={data?.data || []} />
          )}
        </div>
      </div>
    </Layout>
  );
}
