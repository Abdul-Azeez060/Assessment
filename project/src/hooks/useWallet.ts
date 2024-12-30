import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import type { Wallet } from "../types/wallet";
import axios from "axios";

export function useWallet() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setWallet({
        id: "1",
        userId: user.id,
        balance: 1000,
        transactions: [],
      });
      setLoading(false);
    }
  }, [user]);

  const addFunds = async (amount: number) => {
    if (!wallet) return;
    setWallet({
      ...wallet,
      balance: wallet.balance + amount,
      transactions: [
        {
          id: Date.now().toString(),
          amount,
          type: "credit",
          description: "Wallet Recharge",
          timestamp: new Date().toISOString(),
          balance: wallet.balance + amount,
        },
        ...wallet.transactions,
      ],
    });
  };

  return { wallet, loading, addFunds };
}
