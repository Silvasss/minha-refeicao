import { useLoaderData } from 'react-router-dom'

// material-ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// project import
import MainCard from '../../components/MainCard';
import VisitanteInfo from '../../components/VisitanteInfo'
import RefeicaoTable from './RefeicaoTable';
import DietaChart from './DietaChart';
import DietaAreaChart from './DietaAreaChart';
import MedicacaoTable from './MedicacaoTable';
import { endpoints } from '../../api/menu';


export const loader = () =>
    async ({ params }) => {
        const response = await endpoints.queryClient.ensureQueryData({ queryKey: ['GetPublicPerfil', params.id], queryFn: () => endpoints.customFetch(`/${params.id}`) })

        const perfilPublico = response.data

        // três variáveis são para os chart
        const seriesAreaChart = [
            {
                name: 'Carboidrato',
                data: perfilPublico.refeicoes.flatMap(reeicao => reeicao.alimentos.map(alimento => alimento.carboidrato))
            },
            {
                name: 'Proteína',
                data: perfilPublico.refeicoes.flatMap(reeicao => reeicao.alimentos.map(alimento => alimento.proteina))
            }
            ,
            {
                name: 'Gordura',
                data: perfilPublico.refeicoes.flatMap(reeicao => reeicao.alimentos.map(alimento => alimento.gordura))
            },
            {
                name: 'Fibra',
                data: perfilPublico.refeicoes.flatMap(reeicao => reeicao.alimentos.map(alimento => alimento.fibra))
            }
        ]

        const seriesChart = [
            {
                name: 'Carboidrato',
                data: [(perfilPublico.refeicoes.reduce((acc, current) => acc + current.alimentos.reduce((acc, current) => acc + current.carboidrato, 0), 0)).toFixed(1)]
            },
            {
                name: 'Proteína',
                data: [(perfilPublico.refeicoes.reduce((acc, current) => acc + current.alimentos.reduce((acc, current) => acc + current.proteina, 0), 0)).toFixed(1)]
            }
            ,
            {
                name: 'Gordura',
                data: [(perfilPublico.refeicoes.reduce((acc, current) => acc + current.alimentos.reduce((acc, current) => acc + current.gordura, 0), 0)).toFixed(1)]
            },
            {
                name: 'Fibra',
                data: [(perfilPublico.refeicoes.reduce((acc, current) => acc + current.alimentos.reduce((acc, current) => acc + current.fibra, 0), 0)).toFixed(1)]
            }
        ]
        
        const seriesPesoChart = (perfilPublico.refeicoes.reduce((acc, current) => acc + current.alimentos.reduce((acc, current) => acc + current.grama, 0), 0)/ 1000).toFixed(2) 

        return { perfilPublico, seriesAreaChart, seriesChart, seriesPesoChart }
    }

// ==============================|| Visitante PAGE ||============================== //

export default function VisitantePage() {
    const { perfilPublico, seriesAreaChart, seriesChart, seriesPesoChart } = useLoaderData()

    return (
        <Grid container rowSpacing={1.5} columnSpacing={2.75} >
            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 1 */}
            <Grid item lg={4} md={12} xs={12} sx={{ marginTop: '2%', alignContent: 'center' }}>
                <VisitanteInfo dados={perfilPublico} />
            </Grid>

            {/* row 2 */}
            <Grid item lg={8} md={12} xs={12}>
                <Typography variant="h5">Resumo Dieta</Typography>

                <MainCard content={false} sx={{ mt: 1.5 }}>
                    <Box sx={{ pt: 1, pr: 2 }}>
                        <DietaAreaChart series={seriesAreaChart} />
                    </Box>
                </MainCard>
            </Grid>

            {/* row 3 */}
            <Grid item xs={12}>
                <DietaChart seriesChart={seriesChart} seriesPesoChart={seriesPesoChart} seriesAreaChart={seriesAreaChart} />
            </Grid>

            {/* row 4 */}
            <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Medicamentos</Typography>
                    </Grid>
                </Grid>

                <MainCard sx={{ mt: 2 }} content={false}>
                    <MedicacaoTable medicacao={perfilPublico.medicacoes} />
                </MainCard>
            </Grid>

            {/* row 5 */}
            <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Refeições</Typography>
                    </Grid>
                </Grid>

                {
                    perfilPublico.refeicoes.map((element, index) => {
                        return <MainCard sx={{ mt: 2 }} content={false} key={index}>
                            <RefeicaoTable refeicao={element.alimentos} titulo={element.nome} />
                        </MainCard>
                    })
                }
            </Grid>
        </Grid >
    );
}