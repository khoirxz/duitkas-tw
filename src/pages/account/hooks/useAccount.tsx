import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchAccount, postAccount } from "../services/accountApi";
import { fetchBanks } from "../services/accountApi";

export const useAccount = () => {
  return useQuery({
    queryKey: ["account"],
    queryFn: () => fetchAccount(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: (formData: FormData) => postAccount(formData),
  });
};

export const useBanks = () => {
  return useQuery({
    queryKey: ["banks"],
    queryFn: () => fetchBanks(),
    staleTime: 1000 * 60 * 5,
  });
};
