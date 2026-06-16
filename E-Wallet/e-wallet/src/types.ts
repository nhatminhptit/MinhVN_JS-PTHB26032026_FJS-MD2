export type TransactionType = "income" | "expense";

export interface Category {
  id: string;
  name: string;
  limit: number;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  categoryId: string;
  note: string;
  date: string;
  type: TransactionType;
}

export interface AppData {
  categories: Category[];
  transactionsByMonth: Record<string, Transaction[]>;
}
