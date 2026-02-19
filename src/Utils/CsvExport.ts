import type { Allocation } from "../Models/Allocation";

export const exportCSV = (allocations: Allocation[]) => {
  if (!allocations.length) return;

  const csv =
    "MSISDN,Created\n" +
    allocations
      .map(
        (a) => `${a.msisdn},${new Date(a.createdAt).toLocaleString("he-IL")}`
      )
      .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "msisdn.csv";
  link.click();
};
