import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// project import
import Header from './Header';
import Loader from '../../components/Loader';
import { handlerDrawerOpen, useGetMenuMaster } from '../../api/menu';
import Breadcrumbs from '../../components/@extended/Breadcrumbs';
import Navigation from '../../menu-items'

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardLayout() {
    const { menuMasterLoading } = useGetMenuMaster();

    const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));

    useEffect(() => {
        handlerDrawerOpen(!downXL);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [downXL]);

    if (menuMasterLoading) return <Loader />;

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Header />

            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Toolbar />

                <Container>
                    <Breadcrumbs navigation={Navigation} title />

                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
}
