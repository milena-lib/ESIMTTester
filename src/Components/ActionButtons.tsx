import React from "react";
import type { Allocation } from "../Models/Allocation";
import { exportCSV } from "../Utils/CsvExport";

interface Props {
  onAllocate: () => void;
  onReleaseAll: () => void;
  allocations: Allocation[];
}

export const ActionButtons: React.FC<Props> = ({ onAllocate, onReleaseAll, allocations }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <button onClick={onAllocate}>הקצה מספר</button>
      <button onClick={onReleaseAll} style={{ marginLeft: 10 }}>שחרר הכל</button>
      <button onClick={() => exportCSV(allocations)} style={{ marginLeft: 10 }}>
        ייצוא CSV
      </button>
    </div>
  );
};
