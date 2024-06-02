import * as React from 'react';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// assets
import Linkedin from '../../assests/images/linkedin.svg'

export default function FeedBack() {
    return (
        <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 }  }}>
            <Stack spacing={3} sx={{ alignItems: 'center' }}>
                <Box
                    onClick={() => window.open('https://www.linkedin.com/in/felipe-silva-1502b2202/')}
                    component="img"
                    title='Nova aba para o perfil no Linkedin'
                    alt="Link para Linkedin"
                    src={Linkedin}
                    sx={{ display: 'inline-block', height: 'auto', maxWidth: '100%', width: '400px' }}
                />
            </Stack>
        </Box>
    );
}
