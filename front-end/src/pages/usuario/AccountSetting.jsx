import * as React from 'react';
import { redirect, Form } from 'react-router-dom'

// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

// third party
import { toast } from 'react-toastify';

// project import
import { endpoints } from '../../api/menu';
import { store, logoutUser } from '../../contexts/auth-reducer/auth';


export const action = () => async ({ request }) => {
    const formData = await request.formData()

    const data = Object.fromEntries(formData)

    const user = store.getState().userState.user

    try {
        await endpoints.customFetch.delete(`/usuario/${data.password}`, { data: data, headers: { Authorization: `Bearer ${user.token}` } })

        toast.success('Sucesso!')

        store.dispatch(logoutUser())

        return redirect('/')
    } catch (error) {
        error.response.data === 'INVALID_LOGIN_CREDENTIALS' ? toast.error("Credenciais inválidas") : toast.error(error.response.data)

        return null
    }
}

export default function AccountSetting() {
    const [senha, setSenha] = React.useState('')

    return (
        <Grid container spacing={3} sx={{ display: 'flex', flexFlow: 'wrap', marginTop: '2%', width: 'calc(100% + 24px)' }}>
            <Grid item xs={12}>
                <Form className='form' method='POST'>
                    <Card>
                        <CardHeader titleTypographyProps={{ variant: "subtitle1" }} title="Encerramento de conta" />

                        <Divider />

                        <CardContent>
                            <Stack spacing={1}>
                                <Typography variant="body1" color="text.secondary">
                                    A exclusão da conta é permanente. Quando você excluir sua conta, suas informações serão removidas permanente. Após a exclusão, sua conta será permanentemente removida de nossos sistemas, impossibilitando qualquer reativação ou acesso futuro. Caso deseje retornar, será necessário realizar um novo cadastro.
                                </Typography>

                                <InputLabel htmlFor="name-update" style={{ color: 'text.secondary', fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Senha</InputLabel>

                                <OutlinedInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    fullWidth
                                />
                            </Stack>
                        </CardContent>

                        <Divider />

                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <Button variant="contained" type="submit">Excluir sua Conta</Button>
                        </CardActions>
                    </Card>
                </Form>
            </Grid>
        </Grid >
    );
}
