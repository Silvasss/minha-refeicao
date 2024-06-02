import { useState } from 'react';
import { useLoaderData, redirect, Form } from 'react-router-dom'

// material-ui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';

// assets
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MailOutlined from '@ant-design/icons/MailOutlined';
import FileSearchOutlined from '@ant-design/icons/FileSearchOutlined';
import TikTokOutlined from '@ant-design/icons/TikTokOutlined';

// third party
import { toast } from 'react-toastify';

// project import
import { endpoints } from '../../api/menu';
import { store } from '../../contexts/auth-reducer/auth';


export const loader = () => async () => {
    const user = store.getState().userState.user

    try {
        const response = await endpoints.queryClient.ensureQueryData({ queryKey: ['usuario'], queryFn: () => endpoints.customFetch.get(`/usuario`, { headers: { Authorization: `Bearer ${user.token}` } }) })

        const usuarioDados = response.data

        return { usuarioDados }
    } catch (error) {
        toast.warn(error.response.statusText)

        if (error.response.status === 401 || error.response.status === 404) return redirect('/auth/login')
    }
}

export const action = () => async ({ request }) => {
    const formData = await request.formData()

    const data = Object.fromEntries(formData)

    const user = store.getState().userState.user

    try {
        await endpoints.customFetch.put('/usuario', data, { headers: { Authorization: `Bearer ${user.token}` } })

        toast.success('Perfil atualizado!')

        window.location.reload()
    } catch (error) {
        toast.error(error.response.statusText)

        return null
    }
}

export default function AccountDetailsForm() {
    const { usuarioDados } = useLoaderData()

    const [enableEdit, setEnableEdit] = useState(true)

    const [dados, setDados] = useState(usuarioDados)

    const handleChange = (e) => {
        setDados({ ...dados, [e.target.name]: e.target.value })
    }

    return (
        <Grid container spacing={3} sx={{ display: 'flex', flexFlow: 'wrap', marginTop: '2%', width: 'calc(100% + 24px)' }}>
            <Grid item xs={12}>
                <Form className='form' method='POST'>
                    <Card>
                        <CardHeader title="Informações pessoais" titleTypographyProps={{ variant: "subtitle1" }} />

                        <Divider />

                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name-update" style={{ color: 'rgb(140, 140, 140)', fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Nome</InputLabel>

                                        <OutlinedInput
                                            id="name-update"
                                            type="text"
                                            name="nome"
                                            disabled={enableEdit}
                                            value={dados.nome}
                                            onChange={handleChange}
                                            fullWidth
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <PersonSearchIcon />
                                                </InputAdornment>
                                            }
                                        />
                                    </Stack>
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-update" style={{ color: 'rgb(140, 140, 140)', fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Email</InputLabel>

                                        <OutlinedInput
                                            id="email-update"
                                            type="email"
                                            value={usuarioDados.email}
                                            disabled
                                            name="email"
                                            fullWidth
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <MailOutlined />
                                                </InputAdornment>
                                            }
                                        />
                                    </Stack>
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="tiktok-update" style={{ color: 'rgb(140, 140, 140)', fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Tiktok</InputLabel>

                                        <OutlinedInput
                                            id="tiktok-update"
                                            type="text"
                                            value={dados.tiktok}
                                            name="tiktok"
                                            disabled={enableEdit}
                                            onChange={handleChange}
                                            fullWidth
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <TikTokOutlined />
                                                </InputAdornment>
                                            }
                                        />
                                    </Stack>
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="outras-update" style={{ color: 'rgb(140, 140, 140)', fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Outras</InputLabel>

                                        <OutlinedInput
                                            id="outras-update"
                                            type="text"
                                            value={dados.outras}
                                            name="outras"
                                            disabled={enableEdit}
                                            onChange={handleChange}
                                            fullWidth
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <FileSearchOutlined />
                                                </InputAdornment>
                                            }
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>

                        <Divider />

                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            {
                                !enableEdit ?
                                    <>
                                        <Button variant="outlined" onClick={() => { setEnableEdit(true); setDados(usuarioDados) }}>Cancelar</Button>

                                        <Button variant="contained" type="submit" >Salvar</Button>
                                    </>
                                    :
                                    <>
                                        <Button variant="contained" onClick={() => setEnableEdit(false)}>Editar</Button>
                                    </>
                            }
                        </CardActions>
                    </Card>
                </Form>
            </Grid>
        </Grid >
    );
}