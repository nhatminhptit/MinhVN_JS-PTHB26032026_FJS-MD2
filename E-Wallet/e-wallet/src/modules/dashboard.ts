import { loadData } from "./storage";

export const calculateDashboardStats = (monthYear: string) => {
  const data = loadData();
  const monthTransactions = data.transactionsByMonth[monthYear] || [];

  let incomeTotal: number = 0;
  let expenseTotal: number = 0;

  for (const transaction of monthTransactions) {
    if (transaction.type === "income") {
      incomeTotal += transaction.amount;
    } else if (transaction.type === "expense") {
      expenseTotal += transaction.amount;
    }
  }

  return {
    incomeTotal: incomeTotal,
    expenseTotal: expenseTotal,
    balance: incomeTotal - expenseTotal,
  };
};

export const getCategoryProgress = (monthYear: string) => {
  const data = loadData();
  const monthTransactions = data.transactionsByMonth[monthYear] || [];
  const budgetCategories = data.categories.filter((cat) => cat.limit > 0);

  let progressList = budgetCategories.map((cat) => {
    return {
      id: cat.id,
      name: cat.name,
      limit: cat.limit,
      isActive: cat.isActive,
      spent: 0,
    };
  });

  for (const transaction of monthTransactions) {
    if (transaction.type === "expense") {
      const targetCategory = progressList.find(
        (item) => item.id === transaction.categoryId,
      );
      if (targetCategory) targetCategory.spent += transaction.amount;
    }
  }

  return progressList.filter((item) => item.isActive || item.spent > 0);
};

export const checkCategoryLimits = (monthYear: string) => {
  const progressList = getCategoryProgress(monthYear);

  let warningList: string[] = [];

  for (const item of progressList) {
    if (item.spent > item.limit) {
      warningList.push(
        `Cảnh báo: Danh mục "${item.name}" đã vượt hạn mức (Chi: ${item.spent.toLocaleString("vi-VN")} VNĐ / Hạn mức: ${item.limit.toLocaleString("vi-VN")} VNĐ)`,
      );
    }
  }

  return warningList;
};
