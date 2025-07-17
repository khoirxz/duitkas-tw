export const formatRupiah = (
  value: number,
  options?: { showRp?: boolean; useDot?: boolean }
) => {
  const { showRp = true, useDot = false } = options || {};
  let formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

  if (!showRp) {
    // Remove "Rp" and any following dot or space
    formatted = formatted.replace(/^Rp\.?\s?/, "");
  } else if (useDot) {
    // Ensure "Rp." is used
    formatted = formatted.replace(/^Rp/, "Rp.");
  }
  // else, keep default "Rp" (no dot)

  return formatted;
};
