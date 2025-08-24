import DashboardPage from "@/pages/dashboard";
import AccountPage from "@/pages/account";
import AccountFormPage from "@/pages/account/form";
// financial pages
import FinancialPage from "@/pages/financial";
import FinancialListPage from "@/pages/financial/list";
import BudgetFormPage from "@/pages/financial/pages/budget/form";
import GoalFormPage from "@/pages/financial/pages/goal/form";
// transaction pages
import TransactionPage from "@/pages/transaction";
import TransferFormPage from "@/pages/transaction/pages/transfer/form";
import DebtFormPage from "@/pages/transaction/pages/dept/form";
import CashflowFormPage from "@/pages/transaction/pages/cashflow/form";
// report pages
import ReportPage from "@/pages/report";
import ReportTransactionPage from "@/pages/report/pages/transaction";
// setting pages
import SettingPage from "@/pages/setting";
import SettingGeneralPage from "./pages/setting/pages/general";

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
import SettingUserFormPage from "./pages/setting/pages/user/form";

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
        path: "/admin/financial/list",
        element: (
          <ProtectedRouter>
            <FinancialListPage />
          </ProtectedRouter>
        ),
        show: false,
        name: "Perencanaan Dana",
      },
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
    ],
  },
  // === HALAMAN TRANSAKSI ===
  {
    path: "/admin/transaction",
    show: true,
    parent: false,
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
    ],
  },
];
