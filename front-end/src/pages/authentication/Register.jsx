import { Link, redirect } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// toastify
import { toast } from 'react-toastify';

// project import
import AuthWrapper from './AuthWrapper';
import AuthRegister from './auth-forms/AuthRegister';
import { registerUser, store } from '../../contexts/auth-reducer/auth';
import { endpoints } from '../../api/menu';

// ================================|| REGISTER ||================================ //

export const action = () => async ({ request }) => {
    const formData = await request.formData()

    const data = Object.fromEntries(formData)
    
    try {
        const response = await endpoints.customFetch.post('/auth/register', data)

        store.dispatch(registerUser(response.data))

        toast.success('Usuário criado! Redirecionando...')

        return redirect('/perfil/conta')
    } catch (error) {
        error.response.data === 'EmailExists' && toast.error("O endereço de e-mail já está em uso por outra conta")

        error.response.data === 'InvalidEmailAddress' && toast.error("O endereço de e-mail está mal formatado")

        error.response.data === 'WeakPassword' && toast.error("Tamanho mínimo da senha 6 caracteres")

        toast.error(error.response.data)
        
        return null
    }
}

export default function Register() {
    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">Junte-se</Typography>

                        <Typography component={Link} to="/auth/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                            Já faz parte?
                        </Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <AuthRegister />
                </Grid>
            </Grid>
        </AuthWrapper>
    );
}
