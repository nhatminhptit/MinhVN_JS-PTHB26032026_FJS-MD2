import { type Transaction } from "../types.ts";
import { loadData, saveData } from "./storage.ts";

export const getTransactionsByMonth = (monthYear: string): Transaction[] => {
  let data = loadData();

  if (!data.transactionsByMonth[monthYear]) return [];

  data.transactionsByMonth[monthYear].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return data.transactionsByMonth[monthYear];
};

export const addTransaction = (transaction: Omit<Transaction, "id">): void => {
  let data = loadData();

  const monthYear = transaction.date.substring(0, 7);

  if (!data.transactionsByMonth[monthYear]) {
    data.transactionsByMonth[monthYear] = [];
  }

  const newId = Date.now().toString();

  const newTransaction = { id: newId, ...transaction };

  data.transactionsByMonth[monthYear].push(newTransaction);

  saveData(data);
};

export const deleteTransaction = (monthYear: string, id: string) => {
  let data = loadData();

  data.transactionsByMonth[monthYear] = data.transactionsByMonth[
    monthYear
  ].filter((transaction) => transaction.id !== id);

  saveData(data);
};

export const updateTransaction = (
  monthYear: string,
  id: string,
  updatedData: Partial<Transaction>,
): void => {
  let data = loadData();

  if (data.transactionsByMonth[monthYear]) {
    data.transactionsByMonth[monthYear] = data.transactionsByMonth[
      monthYear
    ].map((transaction) => {
      if (transaction.id === id) {
        return { ...transaction, ...updatedData };
      }
      return transaction;
    });
    saveData(data);
  }
};
