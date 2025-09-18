import { useMutation, useQuery } from "@tanstack/react-query";
import {
  postTransaction,
  fetchAllTransaction,
  type typeTransaction,
} from "../services/transactionApi";

type Props = {
  type: typeTransaction["type"];
  options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  };
};

export const useCreateTransaction = ({ type, options = {} }: Props) => {
  return useMutation({
    mutationFn: (formData: FormData) => postTransaction(formData, { type }),
    onSuccess: options.onSuccess,
    onError: options.onError,
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
