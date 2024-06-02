import { useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

// project import
import HeaderContent from './HeaderContent';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

export default function Header() {
    const theme = useTheme();

    // header content
    const headerContent = useMemo(() => <HeaderContent />, []);

    // common header
    const mainHeader = (
        <Toolbar>
            {headerContent}
        </Toolbar>
    );

    // app-bar params
    const appBar = {
        position: 'fixed',
        color: 'inherit',
        elevation: 0,
        sx: {
            borderBottom: `1px solid ${theme.palette.divider}`
            // boxShadow: theme.customShadows.z1
        }
    };

    return (
        <AppBar {...appBar}>{mainHeader}</AppBar>
    );
}