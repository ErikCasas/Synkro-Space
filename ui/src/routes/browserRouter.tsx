import { createBrowserRouter, Outlet } from 'react-router-dom';
import { lazy } from 'react';
import { AuthPage } from '@/pages/AuthPage';
import { ProtectedRoute } from '@/utils/ProtectedRouter';
import { AuthProvider, HeroProvider } from '@/providers';

const MainPage = lazy(() => import('../pages/MainPage'))

export const router = createBrowserRouter([
  {
    element: (
    <AuthProvider>
      <HeroProvider>
        <Outlet />
      </HeroProvider>
    </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          { path: '/synkro', element: <MainPage /> }
        ]
      },
      {
        path: '/auth',
        element: <AuthPage />
      }
    ]
  }
])