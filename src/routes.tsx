import DashboardPage from "@/pages/dashboard";
import AccountPage from "@/pages/account";
import AccountFormPage from "@/pages/account/form";
import FinancialPage from "@/pages/financial";
import FinancialListPage from "@/pages/financial/list";
import FinancialFormPage from "@/pages/financial/form";
import TransactionPage from "@/pages/transaction";
import TransactionFormPage from "./pages/transaction/form";
import ReportPage from "@/pages/report";
import ReportTransactionPage from "@/pages/report/pages/transaction";
import SettingPage from "@/pages/setting";
import LoginPage from "./pages/auth/login";
import SignUpPage from "./pages/auth/signup";

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
import SettingListPage from "./pages/setting/list";
import { ProtectedRouter } from "./components/protected-router";
import IncomeFormPage from "./pages/transaction/pages/income/form";

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
        path: "/admin/financial/form",
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: (
          <ProtectedRouter>
            <FinancialFormPage />
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
        path: "/admin/transaction/form",
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: (
          <ProtectedRouter>
            <TransactionFormPage />
          </ProtectedRouter>
        ),
        show: false,
        name: "Form Transaksi",
      },
      {
        path: "/admin/transaction/form/income",
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: (
          <ProtectedRouter>
            <IncomeFormPage />
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
            <TransactionFormPage />
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
            <TransactionFormPage />
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
            <TransactionFormPage />
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
            <TransactionFormPage />
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
            <SettingListPage />
          </ProtectedRouter>
        ),
        show: false,
        path: "/admin/settings/users",
      },
    ],
  },
];
