// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined
};

// ==============================|| MENU ITEMS - VISITANTE ||============================== //

const Home = {
    id: 'home',
    title: 'Home',
    type: 'group',
    children: [
        {
            id: 'inicio',
            title: 'Inicio',
            type: 'item',
            url: '/',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'visitante',
            title: 'Visitante',
            type: 'item',
            url: '/visitante',
            icon: icons.DashboardOutlined
        },
        {
            id: 'sobre',
            title: 'Sobre',
            type: 'item',
            url: '/sobre',
            icon: icons.DashboardOutlined
        },
        {
            id: 'feedback',
            title: 'FeedBack',
            type: 'item',
            url: '/feedback',
            icon: icons.DashboardOutlined
        }
    ]
};

export default Home;
