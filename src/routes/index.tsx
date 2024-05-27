import { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate, useRoutes } from 'react-router-dom';
import DashboardLayout from "../layouts/dashboard";
import axiosInstance from '../api/axios';
export const AppPage = lazy(() => import('../pages/app'));
export const RoomsPage = lazy(() => import('../pages/rooms'));
export const FormsPage = lazy(() => import('../pages/forms'));
export const ProfilePage = lazy(() => import('../pages/profile'))
export const SigninPage = lazy(() => import('../pages/signin'));
export const SignupPage = lazy(() => import('../pages/signup'));

export default function Router() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axiosInstance.get('/staff/isLogin');
        if (res.data.isLogin) {
          navigate('/');
        }
      } catch (error: any) {
        navigate('/signin');
      }
    };

    checkUser();
  }, []);

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
        { path: 'profile', element: <ProfilePage /> },
      ],
    },
    {
      path:"signin",
      element: <SigninPage />,
    },
    {
      path:"signup",
      element: <SignupPage />,
    }
  ])

  return routes
}
