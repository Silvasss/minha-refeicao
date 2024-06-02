import * as React from 'react';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// assets
import imageErro from '../../assests/images/devias-kit-pro.png'

export default function About() {
    return (
        <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 }, mt: '10%' }}>
            <Stack spacing={3} sx={{ alignItems: 'center' }}>
                <Box
                    component="img"
                    alt="Under ground"
                    src={imageErro}
                    sx={{ display: 'inline-block', height: 'auto', maxWidth: '100%', width: '400px' }}
                />

                <Typography variant="h3" sx={{ textAlign: 'center' }}>
                    Minha Refeição
                </Typography>

                <Typography color="text.secondary" variant="subtitle1" sx={{ textAlign: 'center' }}>
                    Você já pensou em compartilhar sua dieta com seus amigos ou com qualquer outra pessoa? Aqui, você tem a oportunidade de fazer isso.
                </Typography>
            </Stack>
        </Box>
    );
}
