import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchSettings,
  checkIdentity,
  updateSettings,
} from "../services/settingApi";

export const useSetting = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: () => fetchSettings(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCheckIdentity = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (formData: FormData) => checkIdentity(formData),
    ...options,
  });
};

export const useUpdateSetting = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (formData: FormData) => updateSettings(formData),
    ...options,
  });
};
