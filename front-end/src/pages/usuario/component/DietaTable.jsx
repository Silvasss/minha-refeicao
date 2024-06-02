import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// third part
import { toast } from 'react-toastify';
import {
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"

// project import
import { store } from '../../../contexts/auth-reducer/auth'
import { endpoints } from '../../../api/menu';
import EditableCell2 from './EditableCell2'
import FooterCell from './FooterCell'
import EditableCell from './EditableCell'

const columns = [
    {
        accessorKey: "grama",
        header: "Grama",
        footer: "Grama",
        meta: { type: 'number' },
        cell: EditableCell
    },
    {
        accessorKey: "nome",
        header: "Alimento",
        footer: "Alimento",
        meta: { type: 'text' },
        cell: EditableCell
    },
    {
        accessorKey: "kcal",
        header: "Kcal",
        footer: "Kcal",
        meta: { type: 'number' },
        cell: EditableCell
    },
    {
        accessorKey: "carboidrato",
        header: "Carboidrato",
        footer: "Carboidrato",
        meta: { type: 'number' },
        cell: EditableCell
    },
    {
        accessorKey: "proteina",
        header: "Proteína",
        footer: "Proteína",
        meta: { type: 'number' },
        cell: EditableCell
    },
    {
        accessorKey: "gordura",
        header: "Gordura",
        footer: "Gordura",
        meta: { type: 'number' },
        cell: EditableCell
    },
    {
        accessorKey: "fibra",
        header: "Fibra",
        footer: "Fibra",
        meta: { type: 'number' },
        cell: EditableCell
    },
    {
        id: 'edit',
        cell: EditableCell2
    }
]

const action = async (original, alterada, tipo, refeicaoId, titulo) => {
    const user = store.getState().userState.user

    try {
        if (tipo === "upsert" && !original.length) {
            
            let novaRefeicao = [{
                "refeicao_Id": alterada[0].refeicao_Id.toString(),
                "nome": alterada[0].nomeRefeicao,
                "alimentos": []
            }]

            alterada.forEach((element) => {
                let novoAlimento = {
                    "alimento_Id": 0,
                    "nome": "",
                    "grama": 0,
                    "kcal": 0,
                    "carboidrato": 0,
                    "proteina": 0,
                    "gordura": 0,
                    "fibra": 0
                }

                novoAlimento.alimento_Id = element.Alimento_Id
                novoAlimento.nome = element.nome
                novoAlimento.grama = element.grama
                novoAlimento.kcal = element.kcal
                novoAlimento.carboidrato = element.carboidrato
                novoAlimento.proteina = element.proteina
                novoAlimento.gordura = element.gordura
                novoAlimento.fibra = element.fibra

                novaRefeicao[0].alimentos.push(novoAlimento)
            })

            await endpoints.customFetch.put('/refeicao', novaRefeicao, { headers: { Authorization: `Bearer ${user.token}` } })
        }
        else {
            if (tipo === "upsert") {
                let novaRefeicao = [{
                    "refeicao_Id": refeicaoId,
                    "nome": titulo,
                    "alimentos": []
                }]

                alterada.forEach((element) => {
                    let novoAlimento = {
                        "alimento_Id": 0,
                        "nome": "",
                        "grama": 0,
                        "kcal": 0,
                        "carboidrato": 0,
                        "proteina": 0,
                        "gordura": 0,
                        "fibra": 0
                    }

                    novoAlimento.alimento_Id = element.Alimento_Id
                    novoAlimento.nome = element.nome
                    novoAlimento.grama = element.grama
                    novoAlimento.kcal = element.kcal
                    novoAlimento.carboidrato = element.carboidrato
                    novoAlimento.proteina = element.proteina
                    novoAlimento.gordura = element.gordura
                    novoAlimento.fibra = element.fibra

                    novaRefeicao[0].alimentos.push(novoAlimento)
                })

                await endpoints.customFetch.put('/refeicao', novaRefeicao, { headers: { Authorization: `Bearer ${user.token}` } })
            }
            else {
                const novaLista = original.filter(item => alterada.some(item2 => item2.alimento_Id === item.alimento_Id));

                let novaRefeicao = [{
                    "refeicao_Id": refeicaoId,
                    "nome": titulo,
                    "alimentos": []
                }]

                novaLista.forEach((element) => {
                    let novoAlimento = {
                        "alimento_Id": 0,
                        "nome": "",
                        "grama": 0,
                        "kcal": 0,
                        "carboidrato": 0,
                        "proteina": 0,
                        "gordura": 0,
                        "fibra": 0
                    }

                    novoAlimento.alimento_Id = element.Alimento_Id
                    novoAlimento.nome = element.nome
                    novoAlimento.grama = element.grama
                    novoAlimento.kcal = element.kcal
                    novoAlimento.carboidrato = element.carboidrato
                    novoAlimento.proteina = element.proteina
                    novoAlimento.gordura = element.gordura
                    novoAlimento.fibra = element.fibra

                    novaRefeicao[0].alimentos.push(novoAlimento)
                })

                await endpoints.customFetch.put('/refeicao', novaRefeicao, { headers: { Authorization: `Bearer ${user.token}` } })
            }
        }

        toast.success('Refeição atualizada')

        window.location.reload()
    } catch (error) {
        console.log(error.message)

        toast.error(error.message)

        return null
    }
}

export default function DietaTable({ dados, titulo, refeicaoId, onButtonChange }) {
    const [data, setData] = useState(dados)

    const [editedRows, setEditedRows] = useState({})

    const [originalData, setOriginalData] = useState(dados)

    const [editado, setEditado] = useState(false)
    const [apagado, setApagado] = useState(false)
    const [salvarAlimentoApagado, setSalvarAlimentoApagado] = useState(false)

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

                    onButtonChange(false)
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
                    Alimento_Id: Math.floor(Math.random() * 10000) + 9090,
                    grama: "",
                    nome: "",
                    kcal: "",
                    carboidrato: "",
                    proteina: "",
                    gordura: "",
                    fibra: "",
                    refeicao_Id: refeicaoId,
                    nomeRefeicao: titulo
                }

                setData(current => [...current, newRow])
            },
            removeRow: (rowIndex) => {
                const setFilterFunc = (old) => old.filter((_row, index) => index !== rowIndex)

                setData(setFilterFunc)

                setEditado(false)
                setApagado(true)
                onButtonChange(false)
            }
        }
    })

    useEffect(() => {
        apagado && setSalvarAlimentoApagado(true)

        // eslint-disable-next-line
    }, [data])

    return (
        <Box>
            <Toolbar>
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">{titulo}</Typography>
            </Toolbar>

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

            {
                editado &&
                <Stack direction="row" spacing={1.25} justifyContent="flex-end" sx={{ p: 0.5 }}>
                    <Button fullWidth variant="contained" color="success" onClick={() => action(dados, data, "upsert", refeicaoId, titulo)}>Salvar</Button>

                    <Button fullWidth variant="contained" color="error" onClick={() => { setData(dados); setEditado(false); onButtonChange(true) }}>Cancelar</Button>
                </Stack>
            }

            {
                salvarAlimentoApagado &&
                <Stack direction="row" spacing={1.25} justifyContent="flex-end" sx={{ p: 0.5 }}>
                    <Button fullWidth variant="outlined" color="success" onClick={() => action(dados, data, "", refeicaoId, titulo)}>Salvar</Button>

                    <Button fullWidth variant="outlined" color="error" onClick={() => { setData(dados); setSalvarAlimentoApagado(false); onButtonChange(true) }}>Cancelar</Button>
                </Stack>
            }
        </Box>
    )
}

DietaTable.propTypes = { dados: PropTypes.any, titulo: PropTypes.string, refeicaoId: PropTypes.string, onButtonChange: PropTypes.any };