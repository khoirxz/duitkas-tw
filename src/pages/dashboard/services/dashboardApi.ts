import { api } from "@/services/api";
import type { DashboardProps } from "../types/dashboard";

export const fetchDashboard = async (
  month: number,
  year: number
): Promise<DashboardProps> => {
  const response = await api.get("dashboard", {
    params: {
      month: month,
      year: year,
    },
  });

  return response.data;
};
