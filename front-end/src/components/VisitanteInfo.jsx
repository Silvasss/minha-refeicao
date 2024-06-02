import * as React from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// assets
import TikTokOutlined from '@ant-design/icons/TikTokOutlined';
import GlobalOutlined from '@ant-design/icons/GlobalOutlined';


export default function VisitanteInfo(prop) {
    return (
        <Card>
            <CardContent>
                <Stack spacing={2} sx={{ alignItems: 'center' }}>
                    <div>
                        <Avatar sx={{ height: '80px', width: '80px' }} />
                    </div>

                    <Stack spacing={1} sx={{ textAlign: 'center' }}>
                        <Typography variant="h5">{prop.dados.nome}</Typography>

                        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
                            <TikTokOutlined />

                            <Typography color="text.secondary" variant="body1">
                                {prop.dados.tiktok}
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
                            <GlobalOutlined />

                            <Typography color="text.secondary" variant="body1">
                                {prop.dados.outras}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>

            <Divider />
        </Card>
    );
}
