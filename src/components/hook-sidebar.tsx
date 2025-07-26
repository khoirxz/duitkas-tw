// AppDrawerHook

import { useLocation } from "react-router";

export const useSidebar = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return { location, isActive };
};
