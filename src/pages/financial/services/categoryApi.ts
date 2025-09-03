import { api } from "@/services/api";
import type { ResponseProps } from "@/types/response";
import type { CategoryProps } from "../types/category";

interface typeCategory {
  type?: "pengeluaran" | "pemasukan";
}

export const fetchAllCategory = async ({
  type,
}: typeCategory): Promise<ResponseProps & { data: CategoryProps }> => {
  const response = await api.get("kategori/" + type);
  return response.data;
};

export const postCategory = async (
  type: typeCategory["type"],
  formData: FormData
): Promise<ResponseProps> => {
  const response = await api.post("kategori/tambah/" + type, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteCategory = async (
  id: string
): Promise<
  ResponseProps & {
    data: {
      affected: string;
    };
  }
> => {
  const response = await api.delete("kategori/hapus/" + id);
  return response.data;
};
