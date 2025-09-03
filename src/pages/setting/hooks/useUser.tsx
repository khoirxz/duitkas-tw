import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserSettings,
  fetchUserDetailSettings,
  postUserSettings,
  putUserSettings,
  deleteUserSettings,
} from "../services/userApi";

export const useFetchUserSettings = () => {
  return useQuery({
    queryKey: ["userSettings"],
    queryFn: () => fetchUserSettings(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useFetchUserDetailSettings = (id: string) => {
  return useQuery({
    queryKey: ["userDetailSettings", id],
    queryFn: () => fetchUserDetailSettings(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id, // only run the query if id is provided
  });
};

export const useCreateUserSettings = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (formData: FormData) => postUserSettings(formData),
    ...options,
  });
};

export const useUpdateUserSettings = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (formData: FormData) => putUserSettings(formData),
    ...options,
  });
};

export const useDeleteUserSettings = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteUserSettings(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
    },
  });
};
