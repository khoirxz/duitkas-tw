import DashboardPage from "@/pages/dashboard";
import AccountPage from "@/pages/account";

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
  },
];
