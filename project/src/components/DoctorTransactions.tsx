import React, { useEffect, useState } from "react";
import { Download, TrendingUp } from "lucide-react";
import { generateCSV } from "../utils/csv";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface Transaction {
  id: string;
  date: string;
  reason: string;
  amount: number;
  transactionType: string;
}

export const DoctorTransactions: React.FC = () => {
  const [mockTransactions, setMockTransactions] = useState<Transaction[]>([]);
  const { user } = useAuth();
  console.log(user, "this is the user in the transaction component");
  async function init() {
    const res = await axios.get(
      "http://localhost:8000/api/doctor/transaction-history",
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
    console.log(
      res.data.data.walletHistory,
      "this is the response from the backend"
    );
    setMockTransactions(res.data.data.walletHistory);
  }

  useEffect(() => {
    init();
  }, []);
  const downloadCSV = () => {
    const data = mockTransactions.map((trans) => ({
      Date: trans.date,
      Description: trans.reason,
      Amount: trans.amount,
      Type: trans.transactionType,
    }));

    const csvContent = generateCSV(data);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <button
          onClick={downloadCSV}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          <Download className="w-4 h-4 mr-2" />
          Download CSV
        </button>
      </div>

      <div className="space-y-4">
        {mockTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="border rounded-lg p-4 hover:border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium mb-1">{transaction.reason}</p>
                <p className="text-sm text-gray-600">{transaction.date}</p>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="font-medium">${transaction.amount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
