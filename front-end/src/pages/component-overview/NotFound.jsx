import * as React from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// assets
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import imageErro from '../../assests/images/error-404.png'

export default function NotFound() {
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
                    404: A página que você procura não está aqui
                </Typography>

                <Typography color="text.secondary" variant="body1" sx={{ textAlign: 'center' }}>
                    Você tentou algum caminho obscuro ou veio aqui por engano. Seja o que for, tente usar a navegação
                </Typography>

                <Button
                    startIcon={<ArrowLeftOutlined />}
                    variant="contained"
                    component="a"
                    href="/"
                >
                    Voltar para casa
                </Button>
            </Stack>
        </Box>
    );
}
