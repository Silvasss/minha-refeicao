import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project import
import Loadable from '../components/Loadable';
import Usuario from '../layout/Usuario';
import { store } from '../contexts/auth-reducer/auth';

// loader das páginas
import { loader as contaLoader } from '../pages/usuario/index';
import { loader as formLoader } from '../pages/usuario/AccountDetailsForm';
import { action as formAction } from '../pages/usuario/AccountDetailsForm';
import { action as deleteAction } from '../pages/usuario/AccountSetting';
import { loader as medicacaoLoader } from '../pages/usuario/MedicacaoTable';
import { loader as dietaLoader } from '../pages/usuario/Dieta';
import { action as dietaAction } from '../pages/usuario/Dieta';

const UsuarioDefault = Loadable(lazy(() => import('../pages/usuario/index')));
const ContaAtualizar = Loadable(lazy(() => import('../pages/usuario/AccountDetailsForm')));
const ContaSetting = Loadable(lazy(() => import('../pages/usuario/AccountSetting')));
const MedicacaoTable = Loadable(lazy(() => import('../pages/usuario/MedicacaoTable')));
const DietaPage = Loadable(lazy(() => import('../pages/usuario/Dieta')));

// ==============================|| MAIN ROUTING ||============================== //
const user = store.getState().userState.user

const UsuarioRoutes = {
    path: '/',
    element: user ? <Usuario /> : <Navigate to='/auth/login' replace />,
    children: [
        {
            path: 'perfil/conta',
            element: <UsuarioDefault />,
            loader: contaLoader()
        },
        {
            path: 'perfil/conta/update',
            element: <ContaAtualizar />,
            loader: formLoader(),
            action: formAction()
        },
        {
            path: 'perfil/conta/settings',
            element: <ContaSetting />,
            action: deleteAction()
        },
        {
            path: 'perfil/conta/medicacao',
            element: <MedicacaoTable />,
            loader: medicacaoLoader()
        },
        {
            path: 'perfil/conta/dieta',
            element: <DietaPage />,
            loader: dietaLoader(),
            action: dietaAction()
        }
    ]
};

export default UsuarioRoutes;
