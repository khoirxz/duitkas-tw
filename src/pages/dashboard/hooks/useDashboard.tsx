import { useQuery } from "@tanstack/react-query";
import { fetchDashboard } from "../services/dashboardApi";

export const useDashboard = (month: number, year: number) => {
  return useQuery({
    queryKey: ["dashboard", month, year],
    queryFn: () => fetchDashboard(month, year),
    staleTime: 1000 * 60 * 5,
  });
};
