import { useEffect, useState } from 'react';
import { useLoaderData, redirect } from 'react-router-dom'

// material-ui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';

// third part
import { toast } from 'react-toastify';
import {
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"

// project import
import { endpoints } from '../../api/menu';
import { store } from '../../contexts/auth-reducer/auth';
import EditableCell2 from './component/EditableCell2'
import FooterCell from './component/FooterCell'
import EditableCell from './component/EditableCell';


export const loader = () => async () => {
    const user = store.getState().userState.user

    try {
        const response = await endpoints.queryClient.ensureQueryData({ queryKey: ['medicacões'], queryFn: () => endpoints.customFetch.get(`/medicacao`, { headers: { Authorization: `Bearer ${user.token}` } }) })

        const medicacoes = response.data

        return { medicacoes }
    } catch (error) {
        toast.warn(error.response.statusText)

        if (error.response.status === 401 || error.response.status === 404) return redirect('/auth/login')
    }
}

const action = async (original, alterada, tipo) => {
    const user = store.getState().userState.user

    try {
        if (tipo === "upsert" && !original.length) {
            await endpoints.customFetch.post('/medicacao', alterada, { headers: { Authorization: `Bearer ${user.token}` } })
        }
        else {
            if (tipo === "upsert") {
                await endpoints.customFetch.put('/medicacao', alterada, { headers: { Authorization: `Bearer ${user.token}` } })
            } else {
                const objetos = original.filter(obj1 =>
                    !alterada.some(obj2 =>
                        Object.keys(obj1).every(key => obj1[key] === obj2[key])
                    )
                )

                await endpoints.customFetch.delete('/medicacao', { data: objetos, headers: { Authorization: `Bearer ${user.token}` } })
            }
        }

        toast.success('Medicamentos atualizados!')

        window.location.reload()
    } catch (error) {
        toast.error(error.response.statusText)

        return null
    }
}

const columns = [
    {
        accessorKey: "nome",
        header: "Nome",
        footer: "Nome",
        meta: { type: 'text' },
        cell: EditableCell
    },
    {
        accessorKey: "dose",
        header: "Dose",
        footer: "Dose",
        meta: { type: 'number' },
        cell: EditableCell
    },
    {
        accessorKey: "vezesAoDia",
        header: "VezesAoDia",
        footer: "VezesAoDia",
        meta: { type: 'number' },
        cell: EditableCell
    },
    {
        accessorKey: "vezesNaSemana",
        header: "VezesNaSemana",
        footer: "VezesNaSemana",
        meta: { type: 'number' },
        cell: EditableCell
    },
    {
        id: 'edit',
        cell: EditableCell2
    }
]

export default function MedicacaoTable() {
    const { medicacoes } = useLoaderData()

    const [data, setData] = useState(medicacoes)

    const [editedRows, setEditedRows] = useState({})

    const [originalData, setOriginalData] = useState(medicacoes)

    const [editado, setEditado] = useState(false)
    const [apagado, setApagado] = useState(false)
    const [salvarApagado, setSalvarApagado] = useState(false)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {
            editedRows,
            setEditedRows,
            revertData: (rowIndex, revert) => {
                if (revert) {
                    setData((old) =>
                        old.map((row, index) =>
                            index === rowIndex ? originalData[rowIndex] : row
                        )
                    )
                } else {
                    setOriginalData((old) =>
                        old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
                    )

                    setEditado(true)
                }
            },
            updateData: (rowIndex, columnId, value) =>
                setData((prev) =>
                    prev.map((row, index) =>
                        index === rowIndex
                            ? {
                                ...prev[rowIndex],
                                [columnId]: value,
                            }
                            : row
                    )
                ),
            addRow: () => {
                const newRow = {
                    medicacao_Id: (Math.floor(Math.random() * 10000) + 9090).toString(),
                    nome: "",
                    dose: "",
                    vezesAoDia: "",
                    vezesNaSemana: ""
                }

                setData(current => [...current, newRow])
            },
            removeRow: (rowIndex) => {
                const setFilterFunc = (old) => old.filter((_row, index) => index !== rowIndex)

                setData(setFilterFunc)

                setEditado(false)
                setApagado(true)
            }
        }
    })

    useEffect(() => {
        apagado && setSalvarApagado(true)

        // eslint-disable-next-line
    }, [data])

    return (
        <Grid container spacing={3} sx={{ display: 'flex', flexFlow: 'wrap', marginTop: '2%', width: 'calc(100% + 24px)' }}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Medicamentos" titleTypographyProps={{ variant: "subtitle1" }} />

                    <Divider />

                    <CardContent>
                        <Box>
                            <TableContainer
                                sx={{
                                    width: '100%',
                                    overflowX: 'auto',
                                    position: 'relative',
                                    display: 'block',
                                    maxWidth: '100%',
                                    '& td, & th': { whiteSpace: 'nowrap' }
                                }}
                            >
                                <Table aria-labelledby="tableTitle">
                                    <TableHead>
                                        {
                                            table.getHeaderGroups().map(headerGroup => (
                                                <TableRow key={headerGroup.id}>
                                                    {
                                                        headerGroup.headers.map(header => (
                                                            <TableCell key={header.id} align="center">
                                                                {
                                                                    flexRender(
                                                                        header.column.columnDef.header,
                                                                        header.getContext()
                                                                    )
                                                                }
                                                            </TableCell>
                                                        ))
                                                    }
                                                </TableRow>
                                            ))
                                        }
                                    </TableHead>

                                    <TableBody>
                                        {
                                            table.getRowModel().rows.map(row => (
                                                <TableRow key={row.id}>
                                                    {row.getVisibleCells().map(cell => (
                                                        <TableCell key={cell.id} align="center">
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>                                                        
                                                    ))}
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>

                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={table.getCenterLeafColumns().length} align="right">
                                                <FooterCell table={table} />
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>

                            </TableContainer>

                        </Box>
                    </CardContent>

                    <Divider />

                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        {
                            editado &&
                            <>
                                <Button fullWidth variant="contained" color="success" onClick={() => action(medicacoes, data, "upsert")}>Salvar</Button>

                                <Button fullWidth variant="contained" color="error" onClick={() => { setData(medicacoes); setEditado(false) }}>Cancelar</Button>
                            </>
                        }

                        {
                            salvarApagado &&
                            <>
                                <Button fullWidth variant="outlined" color="success" onClick={() => action(medicacoes, data, "")}>Salvar</Button>

                                <Button fullWidth variant="outlined" color="error" onClick={() => { setData(medicacoes); setSalvarApagado(false) }}>Cancelar</Button>
                            </>
                        }

                    </CardActions>
                </Card>
            </Grid >
        </Grid >
    );
}