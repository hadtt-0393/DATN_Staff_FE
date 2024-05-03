import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import DashboardLayout from "../layouts/dashboard";
export const AppPage = lazy(() => import('../pages/app'));
export const RoomPage = lazy(() => import('../pages/room'));
export const FormPage = lazy(() => import('../pages/form'));

export default function Router() {
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
        { path: 'room', element: <RoomPage /> },
        { path: 'form', element: <FormPage /> },
      ],
    },
  ])

  return routes;
}