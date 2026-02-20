import { useState, useEffect } from "react";
import type { Allocation } from "../Models/Allocation";
import { allocationAPI } from "../Services/api";

const EXPIRATION_TIME_MS = 3 * 60 * 60 * 1000;

export const useAllocations = () => {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [now, setNow] = useState(Date.now());
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const allocate = async (userName: string = "User") => {
    try {
      setLoading(true);
      setError(null);
      const entry = await allocationAPI.allocate(userName);
      setAllocations((prev) => [entry, ...prev]);
      addLog(`הוקצה מספר ${entry.msisdn}`);
      return entry;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to allocate";
      setError(errorMsg);
      addLog(`❌ שגיאה בהקצאה: ${errorMsg}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const release = async (id: number, msisdn: string) => {
    try {
      setLoading(true);
      setError(null);
      await allocationAPI.release(id, msisdn);
      setAllocations((prev) => prev.filter((a) => a.id !== id));
      addLog(`שוחרר ${msisdn}`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to release";
      setError(errorMsg);
      addLog(`❌ שגיאה בשחרור: ${errorMsg}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const releaseAll = async () => {
    try {
      setLoading(true);
      setError(null);
      await allocationAPI.releaseAll();
      setAllocations([]);
      addLog("שוחררו כל המספרים");
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to release all";
      setError(errorMsg);
      addLog(`❌ שגיאה בשחרור הכל: ${errorMsg}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { allocations, allocate, release, releaseAll, log, addLog, now, loading, error };
};
