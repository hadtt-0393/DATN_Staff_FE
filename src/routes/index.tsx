import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import DashboardLayout from "../layouts/dashboard";
export const AppPage = lazy(() => import('../pages/app'));
export const RoomsPage = lazy(() => import('../pages/rooms'));
export const FormsPage = lazy(() => import('../pages/forms'));
export const ProfilePage = lazy(() => import('../pages/profile'))

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
        { path: 'rooms', element: <RoomsPage /> },
        { path: 'forms', element: <FormsPage /> },
        { path: 'profile', element: <ProfilePage /> }
      ],
    },
  ])

  return routes;
}