import { useDeleteUserSettings } from "../hooks/useUser";
import { useDeleteOfficeSettings } from "../hooks/useOffice";
import ActionCell from "@/components/ActionCell";

export const ActionCellWrapperUser = ({ id }: { id: string }) => {
  const { mutate } = useDeleteUserSettings(id);

  return (
    <ActionCell
      id={id}
      linkEdit="/admin/settings/users/form"
      config={{
        formField: "id_akun_bank",
        mutation: mutate,
      }}
    />
  );
};
export const ActionCellWrapperOffice = ({ id }: { id: string }) => {
  const { mutate } = useDeleteOfficeSettings(id);

  return (
    <ActionCell
      id={id}
      linkEdit="/admin/settings/offices/form"
      config={{
        formField: "id_akun_bank",
        mutation: mutate,
      }}
    />
  );
};
