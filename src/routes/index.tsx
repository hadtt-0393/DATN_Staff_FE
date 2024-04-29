import { useScrollToTop } from "../hooks/use-scroll-to-top";
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from "../layouts/dashboard";
import AppPage from "../pages/app";
import UserPage from "../pages/user";
import ProductPage from "../pages/product";
import BlogPage from "../pages/blog";

export default function Router(){
    const routes = useRoutes([
        {
            element: (
              <DashboardLayout>
                <Suspense>
                  <Outlet />
                </Suspense>
              </DashboardLayout>
            ),
            children: [
              { element: <AppPage />, index: true },
              { path: 'user', element: <UserPage /> },
              { path: 'products', element: <ProductPage /> },
              { path: 'blog', element: <BlogPage /> },
            ],
          },
    ])

    return routes;
}