// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined
};

// ==============================|| MENU ITEMS - USUARIO ||============================== //

const Usuario = {
    id: 'group-usuario',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'usuario-perfil',
            title: 'Perfil',
            type: 'item',
            url: '/perfil/conta',
            icon: icons.DashboardOutlined
        },
        {
            id: 'usuario-update',
            title: 'Pessoal',
            type: 'item',
            url: '/perfil/conta/update',
            icon: icons.DashboardOutlined
        },
        {
            id: 'usuario-medicacao',
            title: 'Medicação',
            type: 'item',
            url: '/perfil/conta/medicacao',
            icon: icons.DashboardOutlined
        },
        {
            id: 'usuario-dieta',
            title: 'Dieta',
            type: 'item',
            url: '/perfil/conta/dieta',
            icon: icons.DashboardOutlined
        },
        {
            id: 'usuario-setting',
            title: 'Configurações',
            type: 'item',
            url: '/perfil/conta/settings',
            icon: icons.DashboardOutlined
        }
    ]
};

export default Usuario;
