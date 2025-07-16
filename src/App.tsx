import { RouterProvider, createBrowserRouter } from "react-router";

import { router } from "./routes";

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
  return <RouterProvider router={routers} />;
};

export default App;
