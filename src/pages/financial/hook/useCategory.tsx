import { useQuery } from "@tanstack/react-query";

import { fetchAllCategory } from "../services/categoryApi";
import type { ResponseProps } from "@/types/response";
import type { CategoryProps } from "../types/category";

export const useFetchCategories = (type: "pemasukan" | "pengeluaran") => {
  return useQuery<ResponseProps & { data: CategoryProps }>({
    queryKey: ["categories", type],
    queryFn: () => fetchAllCategory({ type }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
