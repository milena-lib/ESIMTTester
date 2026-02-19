import React from "react";
import type { Allocation } from "../Models/Allocation";

interface Props {
  allocation: Allocation | null;
  onClose: () => void;
}

export const QrModal: React.FC<Props> = ({ allocation, onClose }) => {
  if (!allocation) return null;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${allocation.msisdn}`;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{ background: "white", padding: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{allocation.msisdn}</h3>
        <img src={qrUrl} alt="QR" />
        <br />
        <button onClick={onClose}>סגור</button>
      </div>
    </div>
  );
};
