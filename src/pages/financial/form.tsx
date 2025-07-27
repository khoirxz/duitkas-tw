import { useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SlashIcon, RefreshCw, XIcon } from "lucide-react";
import Layout from "@/layouts/layout";

import budgetImg from "@/assets/financial/chart-3d.png";
import goalsImg from "@/assets/financial/goal-trophy.png";
import { Button } from "@/components/ui/button";
import FormBudgetPage from "./partials/formBudget";
import FormGoalsPage from "./partials/formGoals";

const TYPE_FORM = [
  {
    value: "budget",
    label: "Budget",
    description: "Perencanaan Dana Budget",
    img: budgetImg,
  },
  {
    value: "goals",
    label: "Goals",
    description: "Perencanaan Dana Goals",
    img: goalsImg, // Placeholder, replace with actual image for goals
  },
];

export default function FinancialFormPage() {
  const [selectedType, setSelectedType] = useState<"budget" | "goals">(
    "budget"
  );
  const [step, setStep] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    if (selectedType === "budget") {
      setStep(2); // Proceed to next step for budget
    }

    console.log("Form submitted with type:", selectedType);
    console.log("Current step:", step);
  };

  return (
    <Layout>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin/financial"
                  className="text-blue-700 text-lg">
                  Perencanaan Dana
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin/financial/form"
                  className="text-lg">
                  Tambah Perencanaan Dana
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="px-3 md:px-10 py-8 shadow-md border rounded-3xl bg-white flex-col md:flex-row mx-5 mb-5 space-y-10">
        <div className="flex flex-col md:flex-row gap-10">
          <ChangeType
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setStep={setStep}
          />
          {selectedType === "budget" ? (
            <FormBudgetPage step={step} />
          ) : selectedType === "goals" ? (
            <FormGoalsPage />
          ) : null}
        </div>

        <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
          <Button
            type="reset"
            className="bg-white text-indigo-600 flex-1 rounded-full py-5 hover:bg-gray-100">
            Batal
          </Button>
          {selectedType === "budget" && step === 1 ? (
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-500 text-white rounded-full py-5">
              Selanjutnya
            </Button>
          ) : (
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-500 text-white rounded-full py-5">
              Simpan
            </Button>
          )}
        </div>
      </form>
    </Layout>
  );
}

interface ChangeTypeProps {
  selectedType: string;
  setSelectedType: (type: "budget" | "goals") => void;
  setStep?: (step: number) => void;
}

function ChangeType({
  selectedType,
  setSelectedType,
  setStep,
}: ChangeTypeProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleTypeChange = (type: "budget" | "goals") => {
    setSelectedType(type);
    if (setStep) setStep(1); // Reset step to 1 when changing type
    // Close the dialog after selecting a type
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <img
        src={TYPE_FORM.find((type) => type.value === selectedType)?.img}
        alt="Budget"
        className="aspect-square w-xs"
      />

      <p className="font-semibold text-center uppercase">
        {TYPE_FORM.find((type) => type.value === selectedType)?.label}
      </p>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        className="rounded-full bg-green-700 hover:bg-green-500 text-white px-5 py-5 flex items-center gap-2 ">
        <RefreshCw className="mr-2" />
        Ubah Tujuan Perencanaan
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="p-0 bg-transparent border-0 gap-0"
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
            <div className="grid gird-cols-1 md:grid-cols-2 gap-5">
              {TYPE_FORM.map((type) => (
                <div
                  key={type.value}
                  className="flex flex-col items-center gap-3 cursor-pointer shadow hover:shadow-lg transition-shadow rounded-2xl px-5 pt-12 pb-5 border relative"
                  onClick={() =>
                    handleTypeChange(type.value as "budget" | "goals")
                  }>
                  {selectedType === type.value && (
                    <span className="absolute font-public top-4 px-3 py-2 bg-green-500/20 text-green-800 text-xs rounded-full">
                      Tujuan saat ini
                    </span>
                  )}
                  <img
                    src={type.img}
                    alt={type.label}
                    className="h-40 object-contain aspect-square"
                  />
                  <div className="flex flex-col items-center text-center font-public">
                    <span className="font-semibold uppercase">
                      {type.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
