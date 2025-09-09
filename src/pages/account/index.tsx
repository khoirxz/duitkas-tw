import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";

import DataTable, {
  PaginationTable,
  TableFilter,
} from "@/components/data-table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { XIcon } from "lucide-react";
import Layout from "@/layouts/layout";
import { columns } from "./components/columns";

import { AddCircleSolidIcon } from "@/assets/icons/solid";
import { useFetchAccount } from "./hooks/useAccount";

export default function AccountPage() {
  // alert state management
  const [alertVisible, setAlertVisible] = useState<boolean>(true);
  // State management for search, limit, and page
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const { isLoading, data } = useFetchAccount(search, page, limit);
  const location = useLocation();
  const state = location.state as { success?: boolean; message?: string };

  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-start md:items-center justify-between mt-5">
          <h1 className="font-bold text-xl">Data Akun</h1>

          <Button
            variant="default"
            className="rounded-full px-5 py-3 flex flex-row items-center gap-2 h-full w-full md:w-auto bg-blue-700 dark:text-white"
            asChild>
            <Link to="/admin/account/form/add">
              <span>
                <AddCircleSolidIcon color="white" />
              </span>
              Tambah Akun
            </Link>
          </Button>
        </div>

        {state?.success && alertVisible && (
          <Alert className="bg-green-200/50 border-0">
            <AlertDescription className="flex justify-between items-center text-green-700">
              <span>{state.message}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setAlertVisible(false)}>
                <XIcon className="h-4 w-4 text-green-600" />
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-7 space-y-10">
          <TableFilter setSearch={setSearch} setLimit={setLimit} />

          {isLoading ? (
            <div className="w-full animate-pulse">
              <div className="h-48 bg-gray-200 rounded-md w-full mb-2"></div>
            </div>
          ) : (
            <DataTable
              border={false}
              columns={columns}
              data={data?.data.akun || []}
            />
          )}

          <PaginationTable
            limit={limit}
            page={page}
            setPage={setPage}
            total={data?.data.total || 0}
          />
        </div>
      </div>
    </Layout>
  );
}
