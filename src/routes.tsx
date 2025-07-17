import DashboardPage from "@/pages/dashboard";
import AccountPage from "@/pages/account";
import AccountFormPage from "./pages/account/form";

export const router: {
  name: string;
  path: string;
  element: React.ReactNode;
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
      active: <i className="ri-dashboard-line"></i>,
      inactive: <i className="ri-dashboard-line"></i>,
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
      active: <i className="ri-dashboard-line"></i>,
      inactive: <i className="ri-dashboard-line"></i>,
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
];
