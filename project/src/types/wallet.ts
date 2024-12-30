export interface WalletTransaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  timestamp: string;
  balance: number;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  transactions: WalletTransaction[];
}