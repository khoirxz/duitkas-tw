import { useMutation, useQuery } from "@tanstack/react-query";
import {
  postTransaction,
  fetchAllTransaction,
} from "../services/transactionApi";

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: (formData: FormData) =>
      postTransaction(formData, { type: "pemasukan" }),
  });
};

export const useFetchTransaction = (
  search: string,
  page: number = 1,
  limit: number = 10
) => {
  return useQuery({
    queryKey: ["transaction", search, page, limit],
    queryFn: () => fetchAllTransaction({ search, page, limit }),
  });
};
