import React from "react";
import type { Allocation } from "../Models/Allocation";
import { QrCode } from "lucide-react";

interface Props {
  allocation: Allocation;
  now: number;
  onRelease: (id: number, msisdn: string) => void;
  onShowQR: (allocation: Allocation) => void;
}

const EXPIRATION_TIME_MS = 3 * 60 * 60 * 1000;

export const AllocationRow: React.FC<Props> = ({ allocation, now, onRelease, onShowQR }) => {
  const remaining = EXPIRATION_TIME_MS - (now - allocation.createdAt);
  const percent = Math.max(0, remaining / EXPIRATION_TIME_MS) * 100;

  return (
    <tr>
      <td>{allocation.msisdn}</td>
      <td>
        <div style={{ width: 120, background: "#eee" }}>
          <div
            style={{
              width: `${percent}%`,
              height: 6,
              background: "red",
              borderRadius: 4,
            }}
          />
        </div>
      </td>
      <td>
        <button onClick={() => onRelease(allocation.id, allocation.msisdn)}>שחרר</button>
        <button onClick={() => onShowQR(allocation)} style={{ marginLeft: 5 }}>
          <QrCode size={16} />
        </button>
      </td>
    </tr>
  );
};
