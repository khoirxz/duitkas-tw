import { Modal } from "@/components/Modal";

interface ModalFilterProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalFilter({ open, setOpen }: ModalFilterProps) {
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="p-5 bg-white dark:bg-zinc-800 rounded-b-2xl">
        <p>Isi konten filter di sini.</p>
      </div>
    </Modal>
  );
}

export function ModalFilterDebt({ open, setOpen }: ModalFilterProps) {
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="p-5 bg-white dark:bg-zinc-800 rounded-b-2xl">
        <p>Isi konten filter di sini.</p>
      </div>
    </Modal>
  );
}
