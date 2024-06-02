import { Link, redirect } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// toastify
import { toast } from 'react-toastify';

// project import
import AuthWrapper from './AuthWrapper';
import AuthLogin from './auth-forms/AuthLogin';
import { endpoints } from '../../api/menu';
import { loginUser, store } from '../../contexts/auth-reducer/auth';

// ================================|| LOGIN ||================================ //

export const action = () => async ({ request }) => {
    const formData = await request.formData()

    const data = Object.fromEntries(formData)

    try {
        const response = await endpoints.customFetch.post('/auth/login', data)

        store.dispatch(loginUser(response.data))

        toast.success('Login efetuado! Redirecionando...')

        return redirect('/')
    } catch (error) {
        error.response.data === 'INVALID_LOGIN_CREDENTIALS' ? toast.error("Credenciais inválidas") : toast.error(error.response.data)
        
        return null
    }
}

export default function Login() {
    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">Entrar</Typography>

                        <Typography component={Link} to="/auth/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                            Ainda não possui uma conta? Cadastrar-se
                        </Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <AuthLogin />
                </Grid>
            </Grid>
        </AuthWrapper>
    );
}
