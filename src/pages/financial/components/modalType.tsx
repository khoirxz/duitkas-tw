import { useState } from "react";
import { useLocation } from "react-router";

import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { RefreshCw, XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import budgetImg from "@/assets/financial/chart-3d.png";
import goalsImg from "@/assets/financial/goal-trophy.png";

type TypeFormProps = {
  value: "budget" | "goals" | "";
  label: string;
  img: string;
};

const TYPE_FORM: TypeFormProps[] = [
  {
    value: "budget",
    label: "Budget",
    img: budgetImg,
  },
  {
    value: "goals",
    label: "Goals",
    img: goalsImg, // Placeholder, replace with actual image for goals
  },
];

export default function ModalType() {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const currentPath: TypeFormProps["value"] = pathname
    .split("/")
    .pop() as TypeFormProps["value"];

  const handleClick = (url: string) => {
    navigate("/admin/financial/form" + url, { replace: true });
    navigate(0);
  };

  return (
    <div className="flex flex-col gap-3">
      <img
        src={TYPE_FORM.find((type) => type.value === currentPath)?.img}
        alt="Current Type"
        className="aspect-square w-xs"
      />

      <p className="font-semibold text-center uppercase">
        {TYPE_FORM.find((type) => type.value === currentPath)?.label}
      </p>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full bg-green-700 hover:bg-green-500 text-white px-5 py-5 flex items-center gap-2">
        <RefreshCw className="mr-2" />
        Ubah Tujuan perencanaan
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="p-0 bg-transparent border-0 gap-0 sm:max-w-3xl"
          showCloseButton={false}>
          <DialogHeader className="bg-blue-500 py-2 px-5 rounded-t-2xl">
            <DialogTitle className="text-white font-semibold my-2 font-public justify-between flex items-center">
              Tujuan Perencanaan
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
          <div className="bg-white rounded-b-2xl p-5 space-y-5">
            <div className="grid gird-cols-2 md:grid-cols-3 gap-2 overflow-auto max-h-80 md:max-h-full">
              {TYPE_FORM.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleClick(`/${type.value}`)}
                  className="flex flex-col w-full items-center gap-3 cursor-pointer shadow hover:shadow-lg transition-shadow rounded-2xl px-5 pt-12 pb-5 border relative">
                  {currentPath === type.value && (
                    <span className="absolute font-public top-4 px-3 py-2 bg-green-500/20 text-green-800 text-xs rounded-full">
                      Tujuan saat ini
                    </span>
                  )}
                  <img
                    src={type.img}
                    alt={type.label}
                    className="object-contain aspect-square w-20 h-20 md:w-30 md:h-30"
                  />
                  <div className="flex flex-col items-center text-center font-public">
                    <span className="font-semibold uppercase">
                      {type.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
