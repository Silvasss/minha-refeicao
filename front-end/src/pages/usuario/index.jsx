import { useLoaderData, redirect } from 'react-router-dom'

// material-ui
import Grid from '@mui/material/Grid';

// toastify
import { toast } from 'react-toastify';

// project import
import AccountInfo from './AccountInfo';
import AccountDetails from './AccountDetails';
import { endpoints } from '../../api/menu';
import { store } from '../../contexts/auth-reducer/auth';


export const loader = () => async () => {
  const user = store.getState().userState.user

  try {
    const response = await endpoints.queryClient.ensureQueryData({ queryKey: ['usuario'], queryFn: () => endpoints.customFetch.get(`/usuario`, { headers: { Authorization: `Bearer ${user.token}` } }) })

    const usuarioDados = response.data

    return { usuarioDados }
  } catch (error) {
    toast.warn(error.response)

    if (error.response.status === 401 || error.response.status === 404) return redirect('/auth/login')
  }
}

export default function UsuarioPage() {
  const { usuarioDados } = useLoaderData()

  return (
    <Grid container spacing={3} sx={{ display: 'flex', flexFlow: 'wrap', marginTop: '2%', width: 'calc(100% + 24px)' }}>
      <Grid item lg={4} md={4} xs={12}>
        <AccountInfo dados={usuarioDados} />
      </Grid>

      <Grid item lg={8} md={8} xs={12}>
        <AccountDetails dados={usuarioDados} />
      </Grid>
    </Grid>
  );
}