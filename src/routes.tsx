import DashboardPage from "@/pages/dashboard";
import AccountPage from "@/pages/account";
import AccountFormPage from "@/pages/account/form";
// financial pages
import FinancialPage from "@/pages/financial";
import BudgetFormPage from "@/pages/financial/financial.budget.form";
import GoalFormPage from "@/pages/financial/financial.goal.form";
import FinancialCategoryListPage from "@/pages/financial/financial.category.index";
import FinancialCategoryFormPage from "@/pages/financial/financial.category.form";
// transaction pages
import TransactionPage from "@/pages/transaction";
import TransferFormPage from "@/pages/transaction/transaction.transfer.form";
import DebtFormPage from "@/pages/transaction/transaction.dept.form";
import DeptCreditCredit from "@/pages/transaction/transaction.dept.index";
import CashflowFormPage from "@/pages/transaction/transaction.cashglow.form";

// report pages
import ReportPage from "@/pages/report";
import ReportTransactionPage from "@/pages/report/report.transaction.index";
// setting pages
import SettingPage from "@/pages/setting";
import SettingGeneralPage from "@/pages/setting/setting.general.index";
import SettingUserFormPage from "@/pages/setting/setting.user.form";
import SettingOfficeFormPage from "@/pages/setting/setting.office.form";

import LoginPage from "@/pages/auth/login";
import SignUpPage from "@/pages/auth/signup";

import {
  HomeIcon,
  CardIcon,
  GraphIcon,
  CalendarIcon,
  AttachmentIcon,
} from "./assets/icons/outline";
import {
  HomeSolidIcon,
  CardSolidIcon,
  GraphSolidIcon,
  CalendarSolidIcon,
} from "./assets/icons/solid";
import { ProtectedRouter } from "./components/protected-router";


export const router: {
  name: string;
  path: string;
  element: React.ReactNode | null;
  icon?: {
    active: React.ReactNode;
    inactive: React.ReactNode;
  };
  show?: boolean;
  parent?: boolean;
  children?: {
    path: string;
    element: React.ReactNode;
    show?: boolean;
    name: string;
  }[];
}[] = [
  {
    path: "/",
    show: false,
    parent: false,
    name: "Login",
    element: <LoginPage />,
  },
  {
    path: "/auth/signup",
    show: false,
    parent: false,
    name: "Sign Up",
    element: <SignUpPage />,
  },
  {
    path: "/admin/dashboard",
    show: true,
    parent: false,
    name: "Beranda",
    element: (
      <ProtectedRouter>
        <DashboardPage />
      </ProtectedRouter>
    ),
    icon: {
      active: <HomeSolidIcon color="currentColor" />,
      inactive: <HomeIcon color="currentColor" />,
    },
  },
  // === HALAMAN AKUN / ACCOUNT PAGE ===
  {
    path: "/admin/account",
    show: true,
    parent: false,
    name: "Akun",
    element: (
      <ProtectedRouter>
        <AccountPage />
      </ProtectedRouter>
    ),
    icon: {
      active: <CardSolidIcon color="currentColor" />,
      inactive: <CardIcon color="currentColor" />,
    },
    children: [
      {
        path: "/admin/account/form/add",
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: (
          <ProtectedRouter>
            <AccountFormPage />
          </ProtectedRouter>
        ),
        show: false,
        name: "Form tambah akun",
      },
      {
        path: "/admin/account/form/edit/:id",
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: (
          <ProtectedRouter>
            <AccountFormPage />
          </ProtectedRouter>
        ),
        show: false,
        name: "Form edit akun",
      },
    ],
  },
  // === HALAMAN PERENCANAAN DANA / FINANCIAL ===
  {
    path: "/admin/financial",
    show: true,
    parent: false,
    name: "Perencanaan Dana",
    element: (
      <ProtectedRouter>
        <FinancialPage />
      </ProtectedRouter>
    ),
    icon: {
      active: <GraphSolidIcon color="currentColor" />,
      inactive: <GraphIcon color="currentColor" />,
    },
    children: [
      {
        path: "/admin/financial/form/budget",
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: (
          <ProtectedRouter>
            <BudgetFormPage />
          </ProtectedRouter>
        ),
        show: false,
        name: "Daftar Transaksi",
      },
      {
        path: "/admin/financial/form/goals",
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: (
          <ProtectedRouter>
            <GoalFormPage />
          </ProtectedRouter>
        ),
        show: false,
        name: "Daftar Transaksi",
      },
      {
        path: "/admin/financial/category/list",
        element: (
          <ProtectedRouter>
            <FinancialCategoryListPage />
          </ProtectedRouter>
        ),
        show: false,
        name: "Tabel Kategori perencaanaan dana",
      },
      {
        path: "/admin/financial/category/form",
        element: (
          <ProtectedRouter>
            <FinancialCategoryFormPage />
          </ProtectedRouter>
        ),
        show: false,
        name: "Tabel Kategori perencaanaan dana",
      },
      {
        path: "/admin/financial/category/form/:id",
        element: (
          <ProtectedRouter>
            <FinancialCategoryFormPage />
          </ProtectedRouter>
        ),
        show: false,
        name: "Form Kategori perencaanaan dana",
      },
    ],
  },
  // === HALAMAN TRANSAKSI ===
  {
    path: "/admin/transaction",
    show: true,
    parent: true,
    name: "Transaksi",
    element: (
      <ProtectedRouter>
        <TransactionPage />
      </ProtectedRouter>
    ),
    icon: {
      active: <CalendarSolidIcon color="currentColor" />,
      inactive: <CalendarIcon color="currentColor" />,
    },
    children: [
      {
        path: "/admin/transaction/general",
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: (
          <ProtectedRouter>
            <TransactionPage />
          </ProtectedRouter>
        ),
        show: true,
        name: "Umum",
      },
      {
        path: "/admin/transaction/debt-credit", // halaman hutang piutang
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: (
          <ProtectedRouter>
            <DeptCreditCredit />
          </ProtectedRouter>
        ),
        show: true,
        name: "Hutang & Piutang",
      },
      {
        path: "/admin/transaction/form/income",
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: (
          <ProtectedRouter>
            <CashflowFormPage />
          </ProtectedRouter>
        ),
        show: false,
        name: "Form Transaksi Pemasukan",
      },
      {
        path: "/admin/transaction/form/expense",
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: (
          <ProtectedRouter>
            <CashflowFormPage />
          </ProtectedRouter>
        ),
        show: false,
        name: "Form Transaksi Pengeluaran",
      },
      {
        path: "/admin/transaction/form/transfer",
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: (
          <ProtectedRouter>
            <TransferFormPage />
          </ProtectedRouter>
        ),
        show: false,
        name: "Form Transaksi Pindah Dana",
      },
      {
        path: "/admin/transaction/form/debt", // hutang
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: (
          <ProtectedRouter>
            <DebtFormPage />
          </ProtectedRouter>
        ),
        show: false,
        name: "Form Transaksi Pindah Dana",
      },
      {
        path: "/admin/transaction/form/credit", // piutang
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: (
          <ProtectedRouter>
            <DebtFormPage />
          </ProtectedRouter>
        ),
        show: false,
        name: "Form Transaksi Pindah Dana",
      },
    ],
  },
  // === HALAMAN LAPORAN / REPORT ===
  {
    path: "admin/report",
    show: true,
    parent: true,
    name: "Laporan",
    element: (
      <ProtectedRouter>
        <ReportPage />
      </ProtectedRouter>
    ),
    icon: {
      active: <AttachmentIcon color="currentColor" />,
      inactive: <AttachmentIcon color="currentColor" />,
    },
    children: [
      {
        name: "Laporan Keuangan",
        element: (
          <ProtectedRouter>
            <ReportPage />
          </ProtectedRouter>
        ),
        show: true,
        path: "/admin/report/financial",
      },
      {
        name: "Nota/Bukti Transaksi",
        element: (
          <ProtectedRouter>
            <ReportTransactionPage />
          </ProtectedRouter>
        ),
        show: true,
        path: "/admin/report/transaction",
      },
      {
        name: "Arus kas",
        element: (
          <ProtectedRouter>
            <ReportPage />
          </ProtectedRouter>
        ),
        show: true,
        path: "/admin/report/cashflow",
      },
    ],
  },
  // === HALAMAN PENGTURAN / SETTING ===
  {
    path: "/admin/settings",
    show: false,
    parent: false,
    name: "Pengaturan",
    element: (
      <ProtectedRouter>
        <SettingPage />
      </ProtectedRouter>
    ),
    icon: {
      active: <CardSolidIcon color="currentColor" />,
      inactive: <CardIcon color="currentColor" />,
    },
    children: [
      {
        name: "Daftar pengguna",
        element: (
          <ProtectedRouter>
            <SettingGeneralPage />
          </ProtectedRouter>
        ),
        show: false,
        path: "/admin/settings/users",
      },
      {
        name: "Tambah pengguna",
        element: (
          <ProtectedRouter>
            <SettingUserFormPage />
          </ProtectedRouter>
        ),
        show: false,
        path: "/admin/settings/users/form",
      },
      {
        name: "Update pengguna",
        element: (
          <ProtectedRouter>
            <SettingUserFormPage />
          </ProtectedRouter>
        ),
        show: false,
        path: "/admin/settings/users/form/:id",
      },
      {
        name: "Tambah Kantor",
        element: (
          <ProtectedRouter>
            <SettingOfficeFormPage />
          </ProtectedRouter>
        ),
        show: false,
        path: "/admin/settings/offices/form",
      },
      {
        name: "Update Kantor",
        element: (
          <ProtectedRouter>
            <SettingOfficeFormPage />
          </ProtectedRouter>
        ),
        show: false,
        path: "/admin/settings/offices/form/:id",
      },
    ],
  },
];
