import { useQuery } from "@tanstack/react-query";
import { fetchSettings } from "../services/settingApi";

export const useSetting = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: () => fetchSettings(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
