import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchAllCategory, deleteCategory } from "../services/categoryApi";
import type { ResponseProps } from "@/types/response";
import type { CategoryProps } from "../types/category";

export const useFetchCategories = (type: "pemasukan" | "pengeluaran") => {
  return useQuery<ResponseProps & { data: CategoryProps }>({
    queryKey: ["categories", type],
    queryFn: () => fetchAllCategory({ type }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useDeleteCategory = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    ResponseProps & {
      data: {
        affected: string;
      };
    }
  >({
    mutationFn: () => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories", id],
      });
    },
  });
};
