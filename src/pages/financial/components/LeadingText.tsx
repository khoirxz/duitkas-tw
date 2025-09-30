import { formatRupiah } from "@/lib/formatMoney";
import { cn } from "@/lib/utils";

type Props = {
  typeCategory: "percen" | "nominal" | "hybrid";
  total: number;
};

export default function LeadingText({ typeCategory, total }: Props) {
  const label =
    typeCategory === "percen"
      ? "Pastikan persentase mencapai 100%"
      : typeCategory === "nominal"
      ? "Pastikan nominal mencapai target"
      : "Pastikan persentase dan nominal mencapai target";

  return (
    <div className="w-full">
      <p className="text-sm"> {label}</p>
      <p className="font-semibold text-lg">
        {typeCategory === "percen"
          ? "Persentase"
          : typeCategory === "nominal"
          ? "Nominal"
          : null}{" "}
        saat ini:{" "}
        {typeCategory === "percen" ? (
          <span
            className={cn(
              total > 100
                ? "text-red-500"
                : total === 100
                ? "text-green-500"
                : "text-black"
            )}>
            {total}%
          </span>
        ) : typeCategory === "nominal" ? (
          <span>{formatRupiah(total)}</span>
        ) : (
          <span>{total}</span>
        )}
      </p>
    </div>
  );
}
