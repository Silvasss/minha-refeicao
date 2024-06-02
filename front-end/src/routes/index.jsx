import { createBrowserRouter } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import HomeRoutes from './HomeRoutes';
import UsuarioRoutes from './UsuarioRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([HomeRoutes, LoginRoutes, UsuarioRoutes]);

export default router;