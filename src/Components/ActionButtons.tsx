import React, { useState } from "react";
import type { Allocation } from "../Models/Allocation";
import { exportCSV } from "../Utils/CsvExport";

interface Props {
  onAllocate: (userName: string) => Promise<Allocation>;
  onReleaseAll: () => Promise<void>;
  allocations: Allocation[];
  loading?: boolean;
}

export const ActionButtons: React.FC<Props> = ({ onAllocate, onReleaseAll, allocations, loading = false }) => {
  const [userName, setUserName] = useState("User");

  const handleAllocate = async () => {
    try {
      await onAllocate(userName);
    } catch (error) {
      console.error("Allocation failed:", error);
    }
  };

  const handleReleaseAll = async () => {
    try {
      await onReleaseAll();
    } catch (error) {
      console.error("Release all failed:", error);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="הזן שם משתמש"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{ marginRight: 10, padding: 5 }}
        disabled={loading}
      />
      <button onClick={handleAllocate} disabled={loading}>
        {loading ? "טוען..." : "הקצה מספר"}
      </button>
      <button onClick={handleReleaseAll} style={{ marginLeft: 10 }} disabled={loading}>
        {loading ? "טוען..." : "שחרר הכל"}
      </button>
      <button onClick={() => exportCSV(allocations)} style={{ marginLeft: 10 }} disabled={loading}>
        ייצוא CSV
      </button>
    </div>
  );
};
