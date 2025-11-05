import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  children?: React.ReactNode;
  title?: string;
}

export function Modal({
  open,
  setOpen,
  children,
  title = "Modal",
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="p-0 bg-transparent border-0 gap-0 sm:max-w-2xl"
        showCloseButton={false}>
        <DialogHeader className="bg-blue-500 py-2 px-5 rounded-t-2xl">
          <DialogTitle className="text-white text-sm font-normal my-2 font-public justify-between flex items-center">
            {title}
            <button
              className="text-white p-1 cursor-pointer"
              onClick={() => setOpen(false)}>
              <XIcon className="h-4 w-4" />
            </button>
          </DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              Ganti tipe perencanaan dana yang akan dibuat.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
