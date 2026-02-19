import React, { useState } from "react";
import { useAllocations } from "./Hooks/UseAllocations";
import { AllocationTable } from "./Components/AllocationTable";
import { QrModal } from "./Components/QrModal";
import { DebugLog } from "./Components/DebugLog";
import { ActionButtons } from "./Components/ActionButtons";
import type { Allocation } from "./Models/Allocation";

export const App: React.FC = () => {
  const { allocations, allocate, release, releaseAll, log, now } = useAllocations();
  const [selectedQR, setSelectedQR] = useState<Allocation | null>(null);

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h2>MSISDN Demo Dashboard</h2>

      <ActionButtons
        onAllocate={() => setSelectedQR(allocate())}
        onReleaseAll={releaseAll}
        allocations={allocations}
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
