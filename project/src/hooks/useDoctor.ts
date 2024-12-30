import { useState, useEffect } from "react";
import { TimeSlot } from "../types";
import { getDoctorSlots } from "../services/doctorService";

export function useDoctor(doctorId: string) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const slotsData = await getDoctorSlots(doctorId);
        console.log(slotsData, "this is the slots data");
        setSlots(slotsData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch doctor data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  return { slots, loading, error };
}
