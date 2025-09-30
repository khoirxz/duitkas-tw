import { useDeleteCategory } from "../hooks/useCategory";
import ActionCell from "@/components/ActionCell";

export const ActionCellWrapper = ({ id }: { id: string }) => {
  const { mutate } = useDeleteCategory(id);

  return (
    <ActionCell
      id={id}
      linkEdit="/admin/financial/category/form"
      config={{
        mutation: mutate,
      }}
    />
  );
};
