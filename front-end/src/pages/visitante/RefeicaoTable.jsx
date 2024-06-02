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
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';


const headCells = [
    {
        id: 'grama',
        align: 'center',
        disablePadding: false,
        label: 'Grama'
    },
    {
        id: 'nome',
        align: 'center',
        disablePadding: false,
        label: 'Nome'
    },
    {
        id: 'carboidrato',
        align: 'center',
        disablePadding: true,
        label: 'Carboidrato'
    },
    {
        id: 'proteina',
        align: 'center',
        disablePadding: false,
        label: 'Proteína'
    },
    {
        id: 'gordura',
        align: 'center',
        disablePadding: false,
        label: 'Gordura'
    },
    {
        id: 'fibra',
        align: 'center',
        disablePadding: false,
        label: 'Fibra'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
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

// ==============================|| ORDER TABLE ||============================== //

export default function RefeicaoTable({ refeicao, titulo }) {
    const order = 'asc';
    const orderBy = 'grama';

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
                    <OrderTableHead order={order} orderBy={orderBy} />

                    <TableBody>
                        {refeicao.map((row, index) => {
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
                                        <Link color="secondary"> {row.grama.toFixed(0)}</Link>
                                    </TableCell>

                                    <TableCell align="center">{row.nome}</TableCell>

                                    <TableCell align="center">{row.carboidrato.toFixed(0)}</TableCell>

                                    <TableCell align="center">{row.proteina.toFixed(0)}</TableCell>

                                    <TableCell align="center">{row.gordura.toFixed(0)}</TableCell>

                                    <TableCell align="center">{row.fibra.toFixed(0)}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

RefeicaoTable.propTypes = { refeicao: PropTypes.array, titulo: PropTypes.string };