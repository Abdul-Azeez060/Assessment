import { Wallet } from "lucide-react";

export const WalletBalance = ({ balance }: { balance: Number }) => {
  console.log(balance, "this is the balance");
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Wallet className="w-6 h-6 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold">Wallet Balance</h3>
        </div>
        <span className="text-2xl font-bold">{balance} </span>
      </div>
    </div>
  );
};
