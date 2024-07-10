import { lazy, Suspense, useState } from 'react';
import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import DashboardLayout from "../layouts/dashboard";
import axiosInstance from '../api/axios';
export const RoomsPage = lazy(() => import('../pages/rooms'));
export const FormsPage = lazy(() => import('../pages/forms'));
export const ProfilePage = lazy(() => import('../pages/profile'))
export const SigninPage = lazy(() => import('../pages/signin'));
export const SignupPage = lazy(() => import('../pages/signup'));

export default function Router() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axiosInstance.get<{ isLogin: boolean, info: any }>('/staff/isLogin');
        const isLogin = res.data.isLogin;
        localStorage.setItem("user", JSON.stringify(res.data.info))
        const isAuthRoute = [...pathname.matchAll(new RegExp("signin|signup", "g"))].length;
        if (!isLogin && !isAuthRoute) {
          navigate('/signin');
        }
        if (isLogin && isAuthRoute) {
          navigate('/');
        }
      } catch (_) {
        navigate('/signin');
      } finally {
        setLoading(false);
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
        { path: 'rooms', element: <RoomsPage /> },
        { path: 'forms', element: <FormsPage /> },
        { element: <ProfilePage/>, index: true },
      ],
    },
    {
      path: "signin",
      element: <SigninPage />,
    },
    {
      path: "signup",
      element: <SignupPage />,
    },
    {
      path: "*",
      element: <>Trang không tồn tại, quay trở lại <Link to="/" >Trang chủ</Link> </>
    }
  ])

  if (loading) return null;
  return routes
}
