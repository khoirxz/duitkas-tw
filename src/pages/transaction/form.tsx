import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SlashIcon, RefreshCw, XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import Layout from "@/layouts/layout";
import incomeImg from "@/assets/transaction/pemasukan.png";
import expenseImg from "@/assets/transaction/pengeluaran.png";
import transferImg from "@/assets/transaction/pindahdana.png";
import TransferForm from "./partials/transferForm";
import creditImg from "@/assets/transaction/piutang.png";
import debtImg from "@/assets/transaction/hutang.png";
import CashFlowForm from "./partials/cashFlowForm";
import DebtForm from "./partials/debtForm";

type TypeFormProps = {
  value: "transfer" | "income" | "expense" | "debt" | "credit" | "";
  label: string;
  img: string;
};

const TYPE_FORM: TypeFormProps[] = [
  {
    value: "transfer",
    label: "Pindah Dana",
    img: transferImg,
  },
  {
    value: "income",
    label: "Pemasukan",
    img: incomeImg,
  },
  {
    value: "expense",
    label: "Pengeluaran",
    img: expenseImg,
  },
  {
    value: "debt",
    label: "Hutang",
    img: debtImg,
  },
  {
    value: "credit",
    label: "Piutang",
    img: creditImg,
  },
];

export default function TransactionFormPage() {
  const [selectedType, setSelectedType] = useState<TypeFormProps["value"]>("");
  const [searchParams] = useSearchParams({ get: "type" });
  const navigate = useNavigate();

  useEffect(() => {
    const typeFromQuery = searchParams.get("type");
    if (
      typeFromQuery &&
      !["transfer", "income", "expense"].includes(typeFromQuery) &&
      typeFromQuery == null
    ) {
      navigate("/admin/transaction");
    } else {
      setSelectedType(typeFromQuery as TypeFormProps["value"]);
    }

    return () => {
      setSelectedType("");
    };
  }, [searchParams, navigate]);

  return (
    <Layout>
      <Alert variant="destructive" className="bg-red-200/50 border-0">
        <AlertDescription className="flex justify-between items-center">
          Gagal Menambahkan Data Pemasukan
          <Button variant="ghost" size="icon" className="hover:bg-red-300">
            <XIcon className="h-4 w-4 text-red-600" />
          </Button>
        </AlertDescription>
      </Alert>
      <div className="w-full p-3 md:p-5 space-y-7">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin/transaction"
                  className="text-blue-700 text-lg">
                  <h1 className="font-semibold text-lg">Data Transaksi</h1>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-lg">
                  <h1 className="font-semibold text-lg">Tambah Data</h1>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <form className="flex flex-col px-6 py-8 shadow-md border rounded-3xl bg-white mx-5 mb-5 space-y-10">
        <div className="flex flex-col md:flex-row gap-14 md:gap-10">
          <ChangeType
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          {selectedType === "transfer" ? (
            <TransferForm />
          ) : selectedType === "income" || selectedType === "expense" ? (
            <CashFlowForm type={selectedType} />
          ) : selectedType === "credit" || selectedType === "debt" ? (
            <DebtForm />
          ) : null}
        </div>

        <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
          <Button
            type="reset"
            className="bg-white text-indigo-600 flex-1 rounded-full py-3 md:py-5 w-full hover:bg-gray-100">
            Batal
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-full py-3 md:py-5 w-full">
            Simpan
          </Button>
        </div>
      </form>
    </Layout>
  );
}

interface ChangeTypeProps {
  selectedType: string;
  setSelectedType: (type: TypeFormProps["value"]) => void;
}

function ChangeType({ selectedType, setSelectedType }: ChangeTypeProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleTypeChange = (type: TypeFormProps["value"]) => {
    setOpen(false);
    setSelectedType(type);
    // Close the dialog after selecting a type
  };

  return (
    <div className="flex flex-col gap-3 px-6 md:p-0">
      <img
        src={TYPE_FORM.find((type) => type.value === selectedType)?.img}
        alt="Budget"
        className="aspect-square w-40 mx-auto md:w-xs pt-5 md:pt-0"
      />

      <p className="font-semibold text-center uppercase">
        {TYPE_FORM.find((type) => type.value === selectedType)?.label}
      </p>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        className="rounded-full bg-green-700 hover:bg-green-500 text-white px-5 py-5 flex items-center gap-2 ">
        <RefreshCw className="mr-2" />
        Ubah Kategori transaksi
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
                <Link
                  key={type.value}
                  className="flex flex-col w-full items-center gap-3 cursor-pointer shadow hover:shadow-lg transition-shadow rounded-2xl px-5 pt-12 pb-5 border relative"
                  to={`/admin/transaction/form?type=${type.value}`}
                  onClick={() =>
                    handleTypeChange(type.value as TypeFormProps["value"])
                  }>
                  {selectedType === type.value && (
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
                </Link>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
