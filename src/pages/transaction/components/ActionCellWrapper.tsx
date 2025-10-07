import { useState } from "react";
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

import { DeleteSolidIcon, EditSolidIcon } from "@/assets/icons/solid";
import { Input } from "@/components/ui/input";

export const ActionCellWrapper = () => {
  return (
    <div className="flex flex-row items-center w-full gap-2 justify-center">
      <Button
        size="icon"
        className="bg-amber-400 hover:bg-amber-400/80 rounded-full">
        <EditSolidIcon width={16} height={16} color="#fff" />
      </Button>
      <ModalDelete id="1" />
    </div>
  );
};

interface ConfigProps<T = unknown> {
  mutation: (payload: T) => void;
  formField?: string;
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
            Data yang dihapus tidak dapat dikembalikan, Ketik "delete" untuk
            melanjutkan
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input placeholder="" />
        </div>
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
