import { RouterProvider, createBrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/theme-provider";

import { router } from "./routes";
import { useState } from "react";

// Tipe hasil flatten
export interface FlatRouterItem {
  path: string;
  element: React.ReactNode;
}

function flattenRouters(routers: typeof router): FlatRouterItem[] {
  let result: FlatRouterItem[] = [];
  routers.forEach((router) => {
    result.push({
      path: router.path,
      element: router.element,
    });
    if (router.children && Array.isArray(router.children)) {
      result = result.concat(flattenRouters(router.children));
    }
  });
  return result;
}

const formatRouter = flattenRouters(router);

const routers = createBrowserRouter(formatRouter);

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="duitkas-theme">
        <RouterProvider router={routers} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
