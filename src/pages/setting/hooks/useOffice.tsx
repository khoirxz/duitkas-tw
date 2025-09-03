import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchOfficeSettings,
  fetchOfficeDetailSettings,
  postOfficeSettings,
  putOfficeSettings,
} from "../services/officeApi";

export const useFetchOfficeSettings = () => {
  return useQuery({
    queryKey: ["officeSettings"],
    queryFn: () => fetchOfficeSettings(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateOfficeSettings = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (formData: FormData) => postOfficeSettings(formData),
    ...options,
  });
};

export const useFetchOfficeDetailSettings = (id: string) => {
  return useQuery({
    queryKey: ["officeDetailSettings", id],
    queryFn: () => fetchOfficeDetailSettings(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id, // only run the query if id is provided
  });
};

export const useUpdateOfficeSettings = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (formData: FormData) => putOfficeSettings(formData),
    ...options,
  });
};

export const useDeleteOfficeSettings = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => fetchOfficeDetailSettings(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["officeDetailSettings", id],
      });
    },
  });
};
