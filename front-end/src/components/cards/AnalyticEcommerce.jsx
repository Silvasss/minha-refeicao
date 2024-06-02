import PropTypes from 'prop-types';

// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from '../MainCard';

// assets
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export default function AnalyticEcommerce({ color = 'primary', title, userId }) {
    return (
        <MainCard contentSX={{ p: 2.25 }}>
            <Stack spacing={0.5}>
                <Grid container alignItems="center">
                    <Grid item>
                        <Typography variant="h4" color="inherit">
                            {title}
                        </Typography>
                    </Grid>
                </Grid>

                <Chip
                    variant="combined"
                    color={color}
                    icon={<PersonSearchIcon />}
                    sx={{ ml: 1, pl: 1 }}
                    size="small"
                    component="a"
                    href={`/visitante/${userId}`}
                    clickable
                />
            </Stack>
        </MainCard>
    );
}

AnalyticEcommerce.propTypes = { color: PropTypes.string, title: PropTypes.string, userId: PropTypes.string};
