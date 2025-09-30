import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import Layout from "@/layouts/layout";

import DataTable from "@/components/data-table";
import { columnsFinancial } from "./components/columns";
// import { useDataFinance } from "./hooks/useDataFinance";
import { data } from "./data";
import { PlusCircleIcon } from "lucide-react";

export default function FinancialPage() {
  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between mt-5">
          <h1 className="font-bold text-xl">Perencanaan Dana</h1>

          <div className="flex gap-2">
            <Button
              asChild
              variant="default"
              className="rounded-full px-5 py-3 flex flex-row items-center gap-2 h-full w-full md:w-auto bg-amber-600 hover:bg-amber-600/80 dark:text-white text-black">
              <Link to="/admin/financial/category/list">Data Kategori</Link>
            </Button>
            <Button
              asChild
              variant="default"
              className="rounded-full px-6 py-3 flex flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700 dark:text-white">
              <Link to="/admin/financial/form/budget">
                <PlusCircleIcon className="w-4 h-4 fill-white text-blue-700" />
                Perencanaan Dana
              </Link>
            </Button>
          </div>
        </div>
        {/* Additional content for financial plan page can be added here */}

        <div className="mt-7 space-y-10">
          <DataTable columns={columnsFinancial} data={data} />
        </div>
      </div>
    </Layout>
  );
}
