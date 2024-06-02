import PropTypes from 'prop-types';

// project import
import Logo from '../../../../components/logo';
import { Box } from '@mui/system';

// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader() {
    return (
        <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
            <Logo sx={{ width: 'auto', height: 35 }} />
        </Box>
    );
}

DrawerHeader.propTypes = { open: PropTypes.bool };
