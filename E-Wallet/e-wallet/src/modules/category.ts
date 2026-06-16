import { type Category } from "../types.ts";
import { loadData, saveData } from "./storage.ts";

export const getCategories = (): Category[] => {
  return loadData().categories;
};

export const addCategory = (name: string, limit: number): void => {
  const newCategory = {
    id: Date.now().toString(),
    name: name,
    limit: limit,
    isActive: true,
  };

  let data = loadData();
  data.categories.push(newCategory);
  saveData(data);
};

export const deleteCategory = (id: string): boolean => {
  if (id === "default_uncategorized" || id === "default_income") return false;

  let data = loadData();

  const category = data.categories.find((cat) => cat.id === id);
  if (category) {
    category.isActive = false;
  }

  saveData(data);
  return true;
};

export const updateCategory = (
  id: string,
  newName: string,
  newLimit: number,
): void => {
  let data = loadData();
  data.categories.forEach((category) => {
    if (category.id === id) {
      category.name = newName;
      category.limit = newLimit;
    }
  });
  saveData(data);
};