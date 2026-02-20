import React from "react";
import type { Allocation } from "../Models/Allocation";
import { AllocationRow } from "./AllocationRow";

interface Props {
  allocations: Allocation[];
  now: number;
  onRelease: (id: number, msisdn: string) => Promise<void>;
  onShowQR: (allocation: Allocation) => void;
}

export const AllocationTable: React.FC<Props> = ({ allocations, now, onRelease, onShowQR }) => {
  return (
    <table border={1} cellPadding={8} width="100%">
      <thead>
        <tr>
          <th>MSISDN</th>
          <th>זמן נותר</th>
          <th>פעולות</th>
        </tr>
      </thead>
      <tbody>
        {allocations.map((a) => (
          <AllocationRow
            key={a.id}
            allocation={a}
            now={now}
            onRelease={onRelease}
            onShowQR={onShowQR}
          />
        ))}
      </tbody>
    </table>
  );
};
