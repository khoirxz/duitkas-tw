import { Link } from "react-router";
import { DeleteSolidIcon, EditSolidIcon } from "@/assets/icons/solid";
import { Button } from "@/components/ui/button";

import { useDeleteAccount } from "../pages/account/hooks/useAccount";

export default function ActionCell({
  id,
  linkEdit,
}: {
  id: string;
  linkEdit?: string;
}) {
  const { mutate: deleteAccount } = useDeleteAccount();

  const handleDelete = () => {
    const formData = new FormData();

    formData.append("id_akun_bank", id.toString());
    deleteAccount(formData);
  };

  return (
    <div className="flex flex-row items-center w-full gap-2 justify-center">
      <Button
        size="icon"
        className="bg-amber-400 hover:bg-amber-400/80 rounded-full"
        asChild>
        <Link to={`${linkEdit ? linkEdit + `/${id}` : "#"}`}>
          <EditSolidIcon width={16} height={16} color="#fff" />
        </Link>
      </Button>
      <Button
        size="icon"
        onClick={() => handleDelete()}
        className="bg-red-500 hover:bg-red-500/80 rounded-full">
        <DeleteSolidIcon width={16} height={16} color="#fff" />
      </Button>
    </div>
  );
}
