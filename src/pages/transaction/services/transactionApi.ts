import { api } from "@/services/api";
import type { ResponseProps } from "@/types/response";
import type { CategoryProps, TransactionProps } from "../types/transaction";

export type typeCategory = {
  type: "pemasukan" | "pengeluaran" | null;
};

export type typeTransaction = {
  type:
    | "pemasukan"
    | "pengeluaran"
    | "hutang"
    | "piutang"
    | "bank/tambah-transaksi";
};

export const fetchAllTransaction = async ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}): Promise<TransactionProps> => {
  const response = await api.get("transaksi", {
    params: {
      search: search,
      page: page,
      limit: limit,
    },
  });
  return response.data;
};

export const postTransaction = async (
  formData: FormData,
  url: typeTransaction
): Promise<
  ResponseProps & {
    data: {
      insert_id: string;
    };
  }
> => {
  const response = await api.post(url.type, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const fetchAllCategory = async ({
  type = null,
}: typeCategory): Promise<CategoryProps> => {
  const url = type ? `kategori/pengeluaran/${type}` : "kategori/pengeluaran";

  const response = await api.get(url);
  return response.data;
};
