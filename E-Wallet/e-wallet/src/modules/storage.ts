import { type AppData } from "../types.ts";

const STORAGE_KEY = "e_wallet_data";

export const initSeedData = (): AppData => {
  const initData: AppData = {
    categories: [
      {
        id: "default_uncategorized",
        name: "Chưa phân loại",
        limit: 0,
        isActive: true,
      },
      {
        id: "default_income",
        name: "Thu nhập",
        limit: 0,
        isActive: true,
      },
      {
        id: "001",
        name: "Ăn uống",
        limit: 1800000,
        isActive: true,
      },
      {
        id: "002",
        name: "Đồ dùng cá nhân",
        limit: 1000000,
        isActive: true,
      },
    ],
    transactionsByMonth: {},
  };

  return initData;
};

export const saveData = (data: AppData): void => {
  const dataString = JSON.stringify(data);

  localStorage.setItem(STORAGE_KEY, dataString);
};

export const loadData = (): AppData => {
  const dataString = localStorage.getItem(STORAGE_KEY);

  if (dataString === null) {
    const seedData = initSeedData();
    saveData(seedData);
    return seedData;
  }

  return JSON.parse(dataString);
};
