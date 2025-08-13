import { useQuery } from "@tanstack/react-query";
import {
  fetchAllCategory,
  type typeCategory,
} from "../services/transactionApi";

export const useCategory = ({ type }: typeCategory = { type: null }) => {
  return useQuery({
    queryKey: ["category", type],
    queryFn: () => fetchAllCategory({ type }),
    staleTime: 1000 * 60 * 5,
  });
};
