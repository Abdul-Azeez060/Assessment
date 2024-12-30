import axios from "axios";
import { set } from "date-fns";
import { useState, useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
interface DiscountResponse {
  hasDiscount: boolean;
  discountPercentage: number;
  message: string;
}

export function useDiscount(amount: number, doctorId: string) {
  console.log("this is inside useDiscount", doctorId);
  const [discount, setDiscount] = useState<DiscountResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const checkDiscount = async () => {
    setLoading(true);
    try {
      // Simulated API call - replace with actual API endpoint
      const response = await axios.get(
        `${BACKEND_URL}/user/get-discount/${doctorId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `${
              localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user") as string)
                : ""
            }`,
          },
        }
      );
      if (response.data.data.err) {
        setError(response.data.data.err);
      }
      setDiscount({ ...response.data.data, message: response.data.message });
      console.log(
        response.data.data,
        "this is the response from the useDissoucnt backend"
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to check discount");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkDiscount();
  }, [amount]);

  return { discount, loading, error };
}
