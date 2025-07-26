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
    path: "/admin/dashboard",
    show: true,
    parent: false,
    name: "Beranda",
    element: <DashboardPage />,
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
    element: <AccountPage />,
    icon: {
      active: <CardSolidIcon color="currentColor" />,
      inactive: <CardIcon color="currentColor" />,
    },
    children: [
      {
        path: "/admin/account/form/add",
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: <AccountFormPage />,
        show: false,
        name: "Daftar Transaksi",
      },
    ],
  },
  // === HALAMAN PERENCANAAN DANA / FINANCIAL ===
  {
    path: "/admin/financial",
    show: true,
    parent: false,
    name: "Perencanaan Dana",
    element: <FinancialPage />,
    icon: {
      active: <GraphSolidIcon color="currentColor" />,
      inactive: <GraphIcon color="currentColor" />,
    },
    children: [
      {
        path: "/admin/financial/list",
        element: <FinancialListPage />,
        show: false,
        name: "Perencanaan Dana",
      },
      {
        path: "/admin/financial/form",
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: <FinancialFormPage />,
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
    element: <TransactionPage />,
    icon: {
      active: <CalendarSolidIcon color="currentColor" />,
      inactive: <CalendarIcon color="currentColor" />,
    },
    children: [
      {
        path: "/admin/transaction/form",
        // lazy: () => import('./pages/dashboard/index.tsx'),
        element: <TransactionFormPage />,
        show: false,
        name: "Form Transaksi",
      },
    ],
  },
  // === HALAMAN LAPORAN / REPORT ===
  {
    path: "admin/report",
    show: true,
    parent: true,
    name: "Laporan",
    element: <ReportPage />,
    icon: {
      active: <AttachmentIcon color="currentColor" />,
      inactive: <AttachmentIcon color="currentColor" />,
    },
    children: [
      {
        name: "Laporan Keuangan",
        element: <ReportPage />,
        show: true,
        path: "/admin/report/financial",
      },
      {
        name: "Nota/Bukti Transaksi",
        element: <ReportTransactionPage />,
        show: true,
        path: "/admin/report/transaction",
      },
      {
        name: "Arus kas",
        element: <ReportPage />,
        show: true,
        path: "/admin/report/cashflow",
      },
    ],
  },
];
