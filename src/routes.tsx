import DashboardPage from "./pages/dashboard";

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
];
