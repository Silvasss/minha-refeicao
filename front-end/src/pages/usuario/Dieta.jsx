import { useState, useCallback } from 'react';
import { useLoaderData, redirect, Form } from 'react-router-dom'

// material-ui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

// third part
import { toast } from 'react-toastify';

// project import
import { endpoints } from '../../api/menu';
import { store } from '../../contexts/auth-reducer/auth';
import DietaTable from '../usuario/component/DietaTable';


export const loader = () => async () => {
    const user = store.getState().userState.user

    try {
        const response = await endpoints.queryClient.ensureQueryData({ queryKey: ['refeicoes'], queryFn: () => endpoints.customFetch.get(`/refeicao`, { headers: { Authorization: `Bearer ${user.token}` } }) })

        const dieta = response.data

        return { dieta }
    } catch (error) {
        toast.warn(error.response.statusText)

        if (error.response.status === 401 || error.response.status === 404) return redirect('/auth/login')
    }
}

export const action = () => async ({ request }) => {
    const formData = await request.formData()

    const data = Object.fromEntries(formData)

    const user = store.getState().userState.user

    // Base para o novo objeto que será salvo no banco    
    const schema =
    {
        "refeicao_Id": "0",
        "nome": data.nomeRefeicao
    }

    try {
        await endpoints.customFetch.post('/refeicao', schema, { headers: { Authorization: `Bearer ${user.token}` } })

        toast.success('Tabela criada')

        window.location.reload()
    } catch (error) {
        toast.error(error.response.statusText)

        return null
    }
}

const actionLocal = async (refeicao) => {
    const user = store.getState().userState.user

    try {
        await endpoints.customFetch.delete(`/refeicao/${refeicao}`, { headers: { Authorization: `Bearer ${user.token}` } })

        toast.success('Refeição apagada!')

        window.location.reload()
    } catch (error) {
        toast.error(error.response.statusText)

        return null
    }
}

export default function Dieta() {
    const { dieta } = useLoaderData()

    const [enableFieldInput, setEnableFieldInput] = useState(false)

    const [enableDelete, setEnableDelete] = useState(false)

    const [refeicao, setRefeicao] = useState(null)

    const [novaTabela, setNovaTabela] = useState('')

    const [enabledBotoes, setEnabledBotoes] = useState(true)

    const handleChange = (event) => {
        setRefeicao(event.target.value)
    }

    const handleButtonChange = useCallback((e) => {
        setEnabledBotoes(e);
    }, []);
    
    return (
        <Grid container spacing={3} sx={{ display: 'flex', flexFlow: 'wrap', marginTop: '2%', width: 'calc(100% + 24px)' }}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Refeições" titleTypographyProps={{ variant: "subtitle1" }} />

                    <Divider />

                    <CardContent>
                        {
                            dieta.map((element, index) => {
                                return <DietaTable key={index} dados={element.alimentos} titulo={element.nome} refeicaoId={element.refeicao_Id} onButtonChange={handleButtonChange} />
                            })
                        }

                        {
                            enableFieldInput &&
                            <Form className='form' method='POST'>
                                <InputLabel htmlFor="nova-tabela" style={{ color: 'text.secondary', fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Nova tabela</InputLabel>

                                <OutlinedInput
                                    id="nomeRefeicao"
                                    type="text"
                                    name="nomeRefeicao"
                                    value={novaTabela}
                                    onChange={(e) => setNovaTabela(e.target.value)}
                                    fullWidth
                                />

                                <Stack direction="row" spacing={1.25} justifyContent="flex-end" sx={{ p: 0.5 }}>
                                    <Button variant="outlined" onClick={() => setEnableFieldInput(false)}>Cancelar</Button>

                                    <Button type='submit' variant="contained">Salvar</Button>
                                </Stack>
                            </Form>
                        }
                    </CardContent>

                    <Divider />

                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        {
                            enabledBotoes ?
                                (!enableFieldInput && !enableDelete) && <Button fullWidth variant="outlined" onClick={() => setEnableFieldInput(true)}>Nova Refeição</Button>
                                :
                                <></>
                        }

                        {
                            enabledBotoes ?
                                (dieta.length > 0) && enableDelete ?
                                    <>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="delete-tabela" style={{ color: 'text.secondary', fontSize: "0.875rem", lineHeight: 1.43, fontWeight: 400, variant: 'caption' }}>Refeição</InputLabel>

                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={refeicao || ''}
                                                label="refeicao"
                                                onChange={handleChange}
                                            >
                                                {
                                                    dieta.map((elem, index) => {
                                                        return <MenuItem key={index} value={elem.refeicao_Id}>{elem.nome}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>

                                        <Button variant="outlined" onClick={() => setEnableDelete(false)}>Cancelar</Button>

                                        <Button disabled={refeicao === null} variant="contained" onClick={() => actionLocal(refeicao)}>Apagar</Button>
                                    </>
                                    :
                                    !enableFieldInput && <Button fullWidth variant="outlined" color="error" onClick={() => setEnableDelete(true)}>Apagar Refeição</Button>
                                :
                                <></>
                        }
                    </CardActions>
                </Card>
            </Grid >
        </Grid >
    );
}