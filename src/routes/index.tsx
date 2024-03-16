import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { GenericError } from "../components/layout/GenericError";
import { MainLayout } from "../components/layout/MainLayout";
import { paths } from "../constants/paths";
import { Home } from "./home";
import { Products } from "./products";

const router = createBrowserRouter([
  {
    path: paths.ROOT,
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    errorElement: <GenericError />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: paths.PRODUCTS,
        element: <Products />,
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
