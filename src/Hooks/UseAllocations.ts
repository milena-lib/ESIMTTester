import { useState, useEffect } from "react";
import type { Allocation } from "../Models/Allocation";

const EXPIRATION_TIME_MS = 3 * 60 * 60 * 1000;

export const useAllocations = () => {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [now, setNow] = useState(Date.now());
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const expired = allocations.filter(
      (a) => a.createdAt + EXPIRATION_TIME_MS < now
    );
    if (expired.length) {
      setAllocations((prev) =>
        prev.filter((a) => a.createdAt + EXPIRATION_TIME_MS >= now)
      );
      expired.forEach((a) => addLog(`פג תוקף: ${a.msisdn}`));
    }
  }, [now, allocations]);

  const addLog = (msg: string) => {
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));
  };

  const allocate = () => {
    const msisdn = `050-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const entry: Allocation = { id: Date.now(), msisdn, createdAt: Date.now() };
    setAllocations((prev) => [entry, ...prev]);
    addLog(`הוקצה מספר ${msisdn}`);
    return entry;
  };

  const release = (id: number, msisdn: string) => {
    setAllocations((prev) => prev.filter((a) => a.id !== id));
    addLog(`שוחרר ${msisdn}`);
  };

  const releaseAll = () => {
    setAllocations([]);
    addLog("שוחררו כל המספרים");
  };

  return { allocations, allocate, release, releaseAll, log, addLog, now };
};
