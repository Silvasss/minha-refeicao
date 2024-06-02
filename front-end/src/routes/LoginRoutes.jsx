import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

// action das páginas
import { action as loginAction } from '../pages/authentication/Login'
import { action as registerAction } from '../pages/authentication/Register'

// render - login
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('../pages/authentication/Register')));


// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'auth/login',
      element: <AuthLogin />,
      action: loginAction()
    },
    {
      path: 'auth/register',
      element: <AuthRegister />,
      action: registerAction()
    }
  ]
};

export default LoginRoutes;