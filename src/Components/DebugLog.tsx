import React from "react";

interface Props {
  log: string[];
}

export const DebugLog: React.FC<Props> = ({ log }) => {
  return (
    <div style={{ marginTop: 20 }}>
      <h4>לוג</h4>
      {log.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  );
};
