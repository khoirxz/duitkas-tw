import { useDeleteAccount } from "../hooks/useAccount";
import ActionCell from "@/components/ActionCell";

export const ActionCellWrapper = ({ id }: { id: string }) => {
  const { mutate } = useDeleteAccount();

  return (
    <ActionCell
      id={id}
      linkEdit="/admin/account/form/edit"
      config={{
        formField: "id_akun_bank",
        mutation: mutate,
      }}
    />
  );
};
