import {
  calculateDashboardStats,
  getCategoryProgress,
  checkCategoryLimits,
} from "./dashboard.ts";
import {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "./category.ts";
import {
  getTransactionsByMonth,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "./transaction.ts";

declare const Swal: any;

// --- DOM Element ---
const uiMonthFilter = document.getElementById(
  "ui-month-filter",
) as HTMLInputElement;
const uiBalance = document.getElementById("ui-balance") as HTMLHeadingElement;
const uiIncome = document.getElementById("ui-income") as HTMLParagraphElement;
const uiExpense = document.getElementById("ui-expense") as HTMLParagraphElement;
const uiProgressBar = document.getElementById(
  "ui-progress-bar",
) as HTMLDivElement;
const uiPercentText = document.getElementById(
  "ui-percent-text",
) as HTMLSpanElement;
const uiRemainingBudget = document.getElementById(
  "ui-remaining-budget",
) as HTMLSpanElement;
const btnToggleDetails = document.getElementById(
  "btn-toggle-details",
) as HTMLButtonElement;
const categoryProgressContainer = document.getElementById(
  "ui-category-progress-container",
) as HTMLDivElement;
const uiLimitWarnings = document.getElementById(
  "ui-limit-warnings",
) as HTMLDivElement;
const formTransaction = document.getElementById(
  "form-transaction",
) as HTMLFormElement;
const inputAmount = document.getElementById("input-amount") as HTMLInputElement;
const inputType = document.getElementById("input-type") as HTMLInputElement;
const inputCategory = document.getElementById(
  "input-category",
) as HTMLInputElement;
const inputDate = document.getElementById("input-date") as HTMLInputElement;
const inputNote = document.getElementById("input-note") as HTMLInputElement;
const uiUncategorizedWarning = document.getElementById(
  "ui-uncategorized-warning",
) as HTMLDivElement;
const uiUncategorizedList = document.getElementById(
  "ui-uncategorized-list",
) as HTMLDivElement;
const uiHistoryList = document.getElementById(
  "ui-history-list",
) as HTMLDivElement;
const btnAddCategory = document.getElementById(
  "btn-add-category",
) as HTMLButtonElement;
const uiCategoryTable = document.getElementById(
  "ui-category-table",
) as HTMLTableSectionElement;

// --- Render ---
export const renderDashboard = (monthYear: string) => {
  const stats = calculateDashboardStats(monthYear);
  uiBalance.innerText = `${stats.balance.toLocaleString("vi-VN")} VNĐ`;
  uiIncome.innerText = `${stats.incomeTotal.toLocaleString("vi-VN")} VNĐ`;
  uiExpense.innerText = `${stats.expenseTotal.toLocaleString("vi-VN")} VNĐ`;

  const progressList = getCategoryProgress(monthYear);
  const totalBudget = progressList.reduce(
    (sum, item) => (sum += item.limit),
    0,
  );
  const budgetedSpent = progressList.reduce(
    (sum, item) => (sum += item.spent),
    0,
  );
  const remaning = totalBudget - budgetedSpent;

  if (remaning >= 0) {
    uiRemainingBudget.innerText = `${remaning.toLocaleString("vi-VN")} VNĐ`;
    uiRemainingBudget.className = "font-bold text-slate-700";
  } else {
    uiRemainingBudget.innerText = `Vượt quá ${Math.abs(remaning).toLocaleString("vi_VN")} VNĐ`;
    uiRemainingBudget.classList = "font-bold text-rose-500";
  }

  let percent = totalBudget > 0 ? (budgetedSpent / totalBudget) * 100 : 0;
  let barWidth = percent > 100 ? 100 : percent;
  let barColor = "#10b981";
  if (percent > 65 && percent <= 100) barColor = "#f59e0b";
  else if (percent > 100) barColor = "#f43f5e";

  uiProgressBar.style.width = `${barWidth}%`;
  uiProgressBar.style.backgroundColor = barColor;
  uiProgressBar.style.boxShadow = `0 0 12px ${barColor}`;
  uiPercentText.innerText = `${percent.toFixed(1)} %`;
  uiPercentText.style.color = barColor;

  let htmlString = "";
  for (const item of progressList) {
    let childPercent = item.limit > 0 ? (item.spent / item.limit) * 100 : 0;
    let childBarWidth = childPercent > 100 ? 100 : childPercent;
    let childBarColor =
      childPercent > 100
        ? "#f43f5e"
        : childPercent > 80
          ? "#f59e0b"
          : "#3b82f6";

    htmlString += `
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="font-medium text-slate-700">${item.name}</span>
            <span class="text-slate-500">${item.spent.toLocaleString("vi-VN")} / ${item.limit.toLocaleString("vi-VN")} VNĐ</span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-2">
            <div class="h-2 rounded-full" style="width: ${childBarWidth}%; background-color: ${childBarColor};"></div>
          </div>
        </div>
      `;
  }
  categoryProgressContainer.innerHTML = htmlString;

  const warnings = checkCategoryLimits(monthYear);
  let warningHtml = "";
  for (const warn of warnings) {
    warningHtml += `<p class="text-rose-500 font-semibold text-sm">⚠️ ${warn}</p>`;
  }
  uiLimitWarnings.innerHTML = warningHtml;
};

export const renderCategoryDropdown = () => {
  const categories = getCategories().filter((cat) => cat.isActive);
  let htmlString = `<option value="" disabled selected hidden>-- Chọn danh mục --</option>`;
  for (const cat of categories) {
    htmlString += `<option value="${cat.id}">${cat.name}</option>`;
  }

  inputCategory.innerHTML = htmlString;
};

export const renderUncategorizedWarning = (monthYear: string) => {
  const transactions = getTransactionsByMonth(monthYear);
  const uncategorizedTxs = transactions.filter(
    (tx) => tx.categoryId === "default_uncategorized",
  );

  if (uncategorizedTxs.length === 0) {
    uiUncategorizedWarning.classList.add("hidden");
    return;
  }

  uiUncategorizedWarning.classList.remove("hidden");
  let htmlString = "";
  for (const tx of uncategorizedTxs) {
    htmlString += `
      <div class="flex justify-between items-center text-sm bg-white p-2 rounded border border-amber-100">
        <span class="text-slate-600">${tx.date}: <strong class="${tx.type === "income" ? "text-emerald-500" : "text-rose-500"}">${tx.amount.toLocaleString("vi-VN")} VNĐ</strong></span>
        <button data-id="${tx.id}" class="btn-categorize px-3 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition font-medium">Phân loại ngay</button>
      </div>
    `;
  }

  uiUncategorizedList.innerHTML = htmlString;
};

export const renderHistoryList = (monthYear: string) => {
  const transactions = getTransactionsByMonth(monthYear);

  if (transactions.length === 0) {
    uiHistoryList.innerHTML = `<p class="text-slate-400 text-center italic mt-4 text-sm">Chưa có giao dịch nào...</p>`;
    return;
  }

  let htmlString = "";
  for (const tx of transactions) {
    const isIncome = tx.type === "income";
    const amountColor = isIncome ? "text-emerald-500" : "text-rose-500";
    const sign = isIncome ? "+" : "-";

    htmlString += `
      <div class="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
        <div>
          <p class="font-bold ${amountColor}">${sign}${tx.amount.toLocaleString("vi-VN")} VNĐ</p>
          <p class="text-xs text-slate-500">${tx.date} ${tx.note ? `- ${tx.note}` : ""}</p>
        </div>
        <button data-id="${tx.id}" class="btn-delete-tx px-2 py-1 text-xs text-rose-400 hover:text-rose-600 font-medium">Xóa</button>
      </div>
    `;
  }
  uiHistoryList.innerHTML = htmlString;
};

export const renderCategoryTable = () => {
  const categories = getCategories().filter((cat) => cat.isActive);

  let htmlString = "";
  for (const cat of categories) {
    const isDefaultCat =
      cat.id === "default_uncategorized" || cat.id === "default_income";

    htmlString += `
      <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
        <td class="py-3 font-semibold text-slate-700">${cat.name}</td>
        <td class="py-3 text-slate-500 font-medium">
          ${cat.limit > 0 ? `${cat.limit.toLocaleString("vi-VN")} VNĐ` : "—"}
        </td>
        <td class="py-3 text-right">
          ${
            isDefaultCat
              ? '<span class="text-xs text-slate-400 italic">Mặc định</span>'
              : `
            <button data-id="${cat.id}" data-name="${cat.name}" data-limit="${cat.limit}" class="btn-edit-cat text-sm text-blue-500 hover:text-blue-700 font-semibold mr-3 transition-colors">Sửa</button>
            <button data-id="${cat.id}" data-name="${cat.name}" class="btn-delete-cat text-sm text-rose-400 hover:text-rose-600 font-semibold transition-colors">Xóa</button>
          `
          }
        </td>
      </tr>
    `;
  }

  uiCategoryTable.innerHTML = htmlString;
};

// --- Event Listener ---
uiMonthFilter.addEventListener("change", () => {
  const m = uiMonthFilter.value;
  renderDashboard(m);
  renderHistoryList(m);
  renderUncategorizedWarning(m);
});

btnToggleDetails.addEventListener("click", () => {
  categoryProgressContainer.classList.toggle("hidden");
  if (categoryProgressContainer.classList.contains("hidden")) {
    btnToggleDetails.innerHTML = "Xem chi tiết <span>▼</span>";
  } else {
    btnToggleDetails.innerHTML = "Thu gọn <span>▲</span>";
  }
});

inputAmount.addEventListener("input", function () {
  let value = this.value.replace(/\D/g, "");
  if (value !== "") {
    this.value = Number(value).toLocaleString("vi-VN");
  } else {
    this.value = "";
  }
});

formTransaction.addEventListener("submit", (e) => {
  e.preventDefault();
  const rawAmount = inputAmount.value.replace(/\D/g, "");
  const amount = Number(rawAmount);
  const type = inputType.value as "income" | "expense";
  const categoryId = inputCategory.value;
  const date = inputDate.value;
  const monthYear = date.substring(0, 7);
  const note = inputNote.value;

  addTransaction({ amount, categoryId, note, date, type });

  Swal.fire({
    title: "Đã lưu giao dịch!",
    icon: "success",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  formTransaction.reset();
  uiMonthFilter.value = monthYear;

  renderDashboard(monthYear);
  renderHistoryList(monthYear);
  renderUncategorizedWarning(monthYear);
});

uiUncategorizedList.addEventListener("click", async (e) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains("btn-categorize")) {
    const txId = target.getAttribute("data-id") as string;
    const categories = getCategories().filter(
      (cat) => cat.id !== "default_uncategorized",
    );

    let htmlString = "";
    categories.forEach((cat) => {
      htmlString += `<option value="${cat.id}">${cat.name}</option>`;
    });

    const { value: newCategoryId } = await Swal.fire({
      title: "Chọn danh mục mới",
      html: `<select id="swal-new-category" class="w-full px-4 py-2 mt-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">${htmlString}</select>`,
      confirmButtonText: "Lưu",
      showCancelButton: true,
      cancelButtonText: "Hủy",
      preConfirm: () => {
        return (
          document.getElementById("swal-new-category") as HTMLSelectElement
        ).value;
      },
    });

    if (newCategoryId) {
      updateTransaction(uiMonthFilter.value, txId, {
        categoryId: newCategoryId,
      });
      renderDashboard(uiMonthFilter.value);
      renderHistoryList(uiMonthFilter.value);
      renderUncategorizedWarning(uiMonthFilter.value);
    }
  }
});

uiHistoryList.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("btn-delete-tx")) {
    const txId = target.getAttribute("data-id")!;
    deleteTransaction(uiMonthFilter.value, txId);
    renderDashboard(uiMonthFilter.value);
    renderHistoryList(uiMonthFilter.value);
    renderUncategorizedWarning(uiMonthFilter.value);
  }
});

btnAddCategory.addEventListener("click", async () => {
  const { value: formValues } = await Swal.fire({
    title: "Tạo danh mục chi tiêu mới",
    html: `
      <div class="flex flex-col gap-4 mt-4">
        <input id="swal-cat-name" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Tên danh mục">
        <input id="swal-cat-limit" type="number" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Hạn mức VNĐ (Để trống nếu không giới hạn)">
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Hủy",
    confirmButtonText: "Lưu lại",
    confirmButtonColor: "#10b981",
    preConfirm: () => {
      const name = (
        document.getElementById("swal-cat-name") as HTMLInputElement
      ).value;
      const limit = (
        document.getElementById("swal-cat-limit") as HTMLInputElement
      ).value;
      if (!name) {
        Swal.showValidationMessage("Vui lòng nhập tên danh mục!");
      }
      return { name: name, limit: Number(limit) || 0 };
    },
  });

  if (formValues) {
    addCategory(formValues.name, formValues.limit);
    renderCategoryDropdown();
    renderCategoryTable();
    renderDashboard(uiMonthFilter.value);
  }
});

uiCategoryTable.addEventListener("click", async (e) => {
  const target = e.target as HTMLElement;

  // NÚT XÓA DANH MỤC
  if (target.classList.contains("btn-delete-cat")) {
    const catId = target.getAttribute("data-id")!;
    const catName = target.getAttribute("data-name")!;

    const result = await Swal.fire({
      title: "Xóa danh mục?",
      text: `Danh mục "${catName}" sẽ bị ẩn đi, nhưng dữ liệu chi tiêu trong quá khứ vẫn được giữ nguyên.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      confirmButtonText: "Đồng ý ẩn",
      cancelButtonText: "Giữ lại",
    });

    if (result.isConfirmed) {
      deleteCategory(catId);
      renderCategoryDropdown();
      renderCategoryTable();
      renderDashboard(uiMonthFilter.value);
    }
  }

  // NÚT SỬA DANH MỤC
  if (target.classList.contains("btn-edit-cat")) {
    const catId = target.getAttribute("data-id")!;
    const catName = target.getAttribute("data-name")!;
    const catLimit = target.getAttribute("data-limit")!;

    const { value: formValues } = await Swal.fire({
      title: "Chỉnh sửa danh mục",
      html: `
        <div class="flex flex-col gap-4 mt-4">
          <input id="swal-cat-name" value="${catName}" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tên danh mục">
          <input id="swal-cat-limit" type="number" value="${catLimit == "0" ? "" : catLimit}" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Hạn mức VNĐ (Để trống nếu không giới hạn)">
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      confirmButtonText: "Cập nhật",
      confirmButtonColor: "#3b82f6",
      preConfirm: () => {
        const name = (
          document.getElementById("swal-cat-name") as HTMLInputElement
        ).value;
        const limit = (
          document.getElementById("swal-cat-limit") as HTMLInputElement
        ).value;
        if (!name) {
          Swal.showValidationMessage("Vui lòng nhập tên danh mục!");
        }
        return { name: name, limit: Number(limit) || 0 };
      },
    });

    if (formValues) {
      updateCategory(catId, formValues.name, formValues.limit);
      renderCategoryDropdown();
      renderCategoryTable();
      renderDashboard(uiMonthFilter.value);
    }
  }
});

export const initApp = () => {
  renderCategoryDropdown();
  renderCategoryTable();

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const currentMonth = `${yyyy}-${mm}`;

  uiMonthFilter.value = currentMonth;

  renderDashboard(currentMonth);
  renderHistoryList(currentMonth);
  renderUncategorizedWarning(currentMonth);
};
