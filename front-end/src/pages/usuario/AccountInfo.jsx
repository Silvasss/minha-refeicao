import * as React from 'react';
import PropTypes from 'prop-types';

// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// assets
import Avatar from '@mui/material/Avatar';
import TikTokOutlined from '@ant-design/icons/TikTokOutlined';
import GlobalOutlined from '@ant-design/icons/GlobalOutlined';


export default function AccountInfo({ dados }) {
    return (
        <Card>
            <CardContent>
                <Stack spacing={2} sx={{ alignItems: 'center' }}>
                    <div>
                        <Avatar sx={{ height: '80px', width: '80px' }} />
                    </div>

                    <Stack spacing={1} sx={{ textAlign: 'center' }}>
                        <Typography variant="h5">{dados.nome}</Typography>

                        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
                            <TikTokOutlined />

                            <Typography color="text.secondary" variant="body1">
                                {dados.tiktok}
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
                            <GlobalOutlined />

                            <Typography color="text.secondary" variant="body1">
                                {dados.outras}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

AccountInfo.propTypes = { dados: PropTypes.any };