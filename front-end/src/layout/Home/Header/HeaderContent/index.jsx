// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project import
import Profile from './Profile';
import DrawerHeader from '../../Drawer/DrawerHeader';


// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
    const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

    return (
        <>
            <DrawerHeader />

            {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

            <Profile />
        </>
    );
}
