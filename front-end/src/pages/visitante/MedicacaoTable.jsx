import PropTypes from 'prop-types';

// material-ui
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';


const headCells = [
    {
        id: 'nome',
        align: 'center',
        disablePadding: false,
        label: 'Nome'
    },
    {
        id: 'dose',
        align: 'center',
        disablePadding: true,
        label: 'Dose'
    },
    {
        id: 'vezesAoDia',
        align: 'center',
        disablePadding: false,
        label: 'VezesAoDia'
    },
    {
        id: 'vezesNaSemana',
        align: 'center',
        disablePadding: false,
        label: 'VezesNaSemana'
    }
];

// ==============================|| Medicacao TABLE - HEADER ||============================== //

function MedicacaoTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

// ==============================|| Medicacao TABLE ||============================== //

export default function MedicacaoTable({ medicacao }) {
    const order = 'asc';
    const orderBy = 'medicacao_Id';

    return (
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
                    <MedicacaoTableHead order={order} orderBy={orderBy} />
                    <caption >
                        Dose: Refere-se à quantidade específica do medicamento a ser tomada em cada administração. Por exemplo, 500mg.<br />
                        VezesAoDia: Indica quantas vezes o medicamento deve ser tomado em um período de 24 horas. Por exemplo, 2 vezes ao dia.<br />
                        VezesNaSemana: Determina com que frequência o medicamento deve ser tomado ao longo da semana, como "todos os dias" ou "3 vezes por semana".
                    </caption>
                    <TableBody>
                        {medicacao.map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    tabIndex={-1}
                                    key={index}
                                >
                                    <TableCell component="th" id={labelId} scope="row" align="center">
                                        <Link color="secondary"> {row.nome}</Link>
                                    </TableCell>

                                    <TableCell align="center">{row.dose}</TableCell>

                                    <TableCell align="center">{row.vezesAoDia}</TableCell>

                                    <TableCell align="center">{row.vezesNaSemana}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

MedicacaoTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

MedicacaoTable.propTypes = { medicacao: PropTypes.array };