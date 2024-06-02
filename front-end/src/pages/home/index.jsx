import { useLoaderData } from 'react-router-dom'

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import AnalyticEcommerce from '../../components/cards/AnalyticEcommerce';
import { endpoints } from '../../api/menu';


export const loader = () => async () => {
    const response = await endpoints.queryClient.ensureQueryData({ queryKey: ['GetAllPerfil'], queryFn: () => endpoints.customFetch.get(`/`) })

    const allPerfil = response.data

    return { allPerfil }
}

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function HomeDefault() {
    const { allPerfil } = useLoaderData()

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5" align='center'>Perfis</Typography>
            </Grid>

            {
                allPerfil.map((perfil, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <AnalyticEcommerce title={perfil.nome} userId={perfil.usuario_Id}/>
                        </Grid>
                    )
                })
            }
            
            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
        </Grid>
    );
}
