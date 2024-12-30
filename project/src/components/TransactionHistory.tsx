import React, { useEffect, useState } from "react";
import { Download, TrendingUp, TrendingDown } from "lucide-react";
import { generateCSV } from "../utils/csv";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface MocAppointments {
  _id: string;
  userId: any;
  doctorId: any;
  role: string;
  trasactionType: string;
  amount: Number;
}

export const TransactionHistory: React.FC = () => {
  const [mockTransactions, setMockTransactions] = useState<MocAppointments[]>(
    []
  );
  const { user } = useAuth();

  useEffect(() => {
    async function init() {
      const res = await axios.get(`${BACKEND_URL}/user/transaction-history`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `${
            localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user") as string)
              : ""
          }`,
        },
      });
      console.log(
        res.data.data.walletHistory,
        "this is the res from trnsactions"
      );
      setMockTransactions(res.data.data.walletHistory);
    }
    init();
  }, [user]);
  const downloadCSV = () => {
    const data = mockTransactions.map((trans) => ({
      Description: "Appointment fee",
      Type: trans.trasactionType,
      Amount: trans.amount,
      user: trans.userId.name,
      doctor: trans.doctorId.name,
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <button
          onClick={downloadCSV}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          <Download className="w-4 h-4 mr-2" />
          Download CSV
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {mockTransactions.map((transaction) => (
          <div
            key={transaction._id}
            className="border-b last:border-b-0 p-4 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{"Appointment fee"}</p>
                <p className="text-sm text-gray-600">
                  {transaction.doctorId.name}
                </p>
              </div>
              <div className="flex items-center">
                {transaction.trasactionType === "credit" ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-2" />
                )}
                <span
                  className={
                    transaction.trasactionType === "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }>
                  ${Math.abs(transaction.amount as number)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
