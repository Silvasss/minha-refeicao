import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import Home from '../layout/Home';

// loader das páginas
import { loader as homeLoader } from '../pages/home/index';
import { loader as visitanteLoader } from '../pages/visitante/index';

const HomeDefault = Loadable(lazy(() => import('../pages/home/index')));
const VisitantePage = Loadable(lazy(() => import('../pages/visitante/index')));
const AboutPage = Loadable(lazy(() => import('../pages/component-overview/About')));
const FeedBackPage = Loadable(lazy(() => import('../pages/component-overview/FeedBack')));
const NotFoundPage = Loadable(lazy(() => import('../pages/component-overview/NotFound')));


// ==============================|| MAIN ROUTING ||============================== //

const HomeRoutes = {
  path: '/',
  element: <Home />,
  children: [
    {
      path: '/',
      element: <HomeDefault />,
      loader: homeLoader(),
    },
    {
      path: 'visitante/:id',
      element: <VisitantePage />,
      loader: visitanteLoader()
    },
    {
      path: 'sobre',
      element: <AboutPage />
    },
    {
      path: 'feedback',
      element: <FeedBackPage />
    },
    {
      path: '*',
      element: <NotFoundPage />
    }
  ]
};

export default HomeRoutes;
