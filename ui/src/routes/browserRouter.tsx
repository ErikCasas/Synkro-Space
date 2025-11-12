import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { AuthPage } from '@/pages/AuthPage';
import { ProtectedRoute } from '@/utils/ProtectedRouter';
import { AuthProvider, HeroProvider } from '@/providers';
import MainLayout from '@/layouts/Main';
import { Router } from './routes';
import { GeneralLayout } from '@/layouts/General';
import { PublicRouter } from '@/utils/PublicRouter';

const MainPage = lazy(() => import('../pages/MainPage'))

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <HeroProvider>
          <GeneralLayout />
        </HeroProvider>
      </AuthProvider>
    ),
    children: [
      {
        path: Router.base,
        element:
          <MainLayout>
            <ProtectedRoute />
          </MainLayout>,

        children: [
          { path: Router.main, element: <MainPage /> }
        ]
      },
      {
        path: Router.base,
        element:
          <MainLayout>
            <PublicRouter />
          </MainLayout>,

        children: [
          { path: Router.auth, element: <AuthPage /> }
        ]
      },

      // {
      //   path: Router.default,
      //   element: <AuthPage />
      // }
    ]
  }
])