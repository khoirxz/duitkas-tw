// Cek apakah data dari finansial dan kategori (pemasukan dan pengeluaran) sudah ada.
// Jika 3 data belum ada maka akan diarahkan pada halaman pembuatan kategori
// jika kategori sudah ada maka akan tetapi berada dihalaman pembuatan finansial

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useFetchBudget } from "./useFinancial";
import { useFetchCategories } from "./useCategory";

export const useDataFinance = () => {
  const { data: dataBudget, isLoading: isLoadingBudget } = useFetchBudget();
  const { data: dataCatIncome, isLoading: isLoadingCatIncome } =
    useFetchCategories("pemasukan");
  const { data: dataCatExpense, isLoading: isLoadingCatExpense } =
    useFetchCategories("pengeluaran");

  const navigate = useNavigate();

  useEffect(() => {
    // tunggu semua query selesai
    if (isLoadingBudget || isLoadingCatIncome || isLoadingCatExpense) return;

    const hasBudget = (dataBudget?.data?.length ?? 0) > 0;
    const hasIncomeCat = (dataCatIncome?.data?.kategori?.length ?? 0) > 0;
    const hasExpenseCat = (dataCatExpense?.data?.kategori?.length ?? 0) > 0;

    // kalau ketiganya kosong → redirect ke kategori
    if (!hasBudget && !hasIncomeCat && !hasExpenseCat) {
      navigate("/admin/financial/category/list", { replace: true });
    }
  }, [
    isLoadingBudget,
    isLoadingCatIncome,
    isLoadingCatExpense,
    dataBudget,
    dataCatIncome,
    dataCatExpense,
    navigate,
  ]);

  return { dataBudget, isLoadingBudget };
};
