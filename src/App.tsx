import React, { useState } from "react";
import { useAllocations } from "./Hooks/UseAllocations";
import { AllocationTable } from "./Components/AllocationTable";
import { QrModal } from "./Components/QrModal";
import { DebugLog } from "./Components/DebugLog";
import { ActionButtons } from "./Components/ActionButtons";
import type { Allocation } from "./Models/Allocation";

export const App: React.FC = () => {
  const { allocations, allocate, release, releaseAll, log, now, loading } = useAllocations();
  const [selectedQR, setSelectedQR] = useState<Allocation | null>(null);

  const handleAllocate = async (userName: string) => {
    const allocation = await allocate(userName);
    setSelectedQR(allocation);
    return allocation;
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h2>MSISDN Demo Dashboard</h2>

      <ActionButtons
        onAllocate={handleAllocate}
        onReleaseAll={releaseAll}
        allocations={allocations}
        loading={loading}
      />

      <AllocationTable
        allocations={allocations}
        now={now}
        onRelease={release}
        onShowQR={setSelectedQR}
      />

      <DebugLog log={log} />

      <QrModal allocation={selectedQR} onClose={() => setSelectedQR(null)} />
    </div>
  );
};

export default App;
