import Layout from "@/layouts/Layout";
import ProductAdd from "@/pages/ProductAdd/ProductAdd";
import ProductDetail from "@/pages/ProductDetail/ProductDetail";
import ProductEdit from "@/pages/ProductEdit/ProductEdit";
import ProductList from "@/pages/ProductList/ProductList";
import { RouteObject } from "react-router";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: "products",
        children: [
          { path: "add", element: <ProductAdd /> },
          {
            path: ":id",
            element: <ProductDetail />,
          },
          { path: ":id/edit", element: <ProductEdit /> },
        ],
      },
    ],
  },
];

export default routes;
