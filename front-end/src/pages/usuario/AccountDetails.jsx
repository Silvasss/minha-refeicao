import * as React from 'react';
import PropTypes from 'prop-types';

// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';


export default function AccountDetails({ dados }) {
    return (
        <Card>
            <CardHeader title="Detalhes pessoais" titleTypographyProps={{ variant: "subtitle1" }} />

            <Divider />

            <CardContent>
                <Grid container spacing={3}>
                    <Grid md={6} xs={12} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Typography variant="body1" fontWeight={400} fontSize={"0.875rem"} lineHeight={1.57} color="text.secondary">Nome</Typography>

                        <Typography variant="body1" fontWeight={400} fontSize={"0.875rem"} lineHeight={1.57}>{dados.nome}</Typography>
                    </Grid>

                    <Grid md={6} xs={12} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Typography variant="body1" fontWeight={400} fontSize={"0.875rem"} lineHeight={1.57} color="text.secondary">Email</Typography>

                        <Typography variant="body1" fontWeight={400} fontSize={"0.875rem"} lineHeight={1.57}>{dados.email}</Typography>
                    </Grid>

                    <Grid md={6} xs={12} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Typography variant="body1" fontWeight={400} fontSize={"0.875rem"} lineHeight={1.57} color="text.secondary">Tiktok</Typography>

                        <Typography variant="body1" fontWeight={400} fontSize={"0.875rem"} lineHeight={1.57}>{dados.tiktok}</Typography>
                    </Grid>

                    <Grid md={6} xs={12} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Typography variant="body1" fontWeight={400} fontSize={"0.875rem"} lineHeight={1.57} color="text.secondary">Outras</Typography>

                        <Typography variant="body1" fontWeight={400} fontSize={"0.875rem"} lineHeight={1.57}>{dados.outras}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

AccountDetails.propTypes = { dados: PropTypes.object };