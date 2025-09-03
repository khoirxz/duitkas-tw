import { useState } from "react";
import { Link } from "react-router";
import { DeleteSolidIcon, EditSolidIcon } from "@/assets/icons/solid";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface ConfigProps<T = unknown> {
  mutation: (payload: T) => void;
  formField?: string;
}

export default function ActionCell<T>({
  id,
  linkEdit,
  config,
}: {
  id: string;
  linkEdit?: string;
  config: ConfigProps<T>;
}) {
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
      <ModalDelete id={id} config={config} />
    </div>
  );
}

const ModalDelete = <T,>({
  id,
  config,
}: {
  id: string;
  config?: ConfigProps<T>;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = () => {
    if (!config?.mutation) {
      console.error("Missing mutation function in config.");
      return;
    }

    if (config.formField) {
      // Kasus FormData
      const formData = new FormData();
      formData.append(config.formField, id.toString());
      config.mutation(formData as T);
    } else {
      // Kasus langsung id
      config.mutation(id as unknown as T);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="bg-red-500 hover:bg-red-500/80 rounded-full">
          <DeleteSolidIcon width={16} height={16} color="#fff" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apakah anda yakin?</DialogTitle>
          <DialogDescription>
            Data yang dihapus tidak dapat dikembalikan
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleDelete}
            type="button"
            className="bg-red-500 hover:bg-red-500/80">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
