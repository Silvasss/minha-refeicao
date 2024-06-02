import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const FooterCell = ({ table }) => {
    const meta = table.options.meta

    return (
        <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Button variant="outlined" color="success" sx={{ textTransform: 'capitalize' }} onClick={meta?.addRow}>Nova linha +</Button>
        </Box>
    )
}


export default FooterCell