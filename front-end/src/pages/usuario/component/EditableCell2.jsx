import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';


const EditableCell2 = ({ row, table }) => {

    const setEditedRows = (e) => {
        const elName = e.currentTarget.name

        table.options.meta?.setEditedRows((old) => ({
            ...old,
            [row.id]: !old[row.id],
        }))

        if (elName !== "edit") {
            table.options.meta?.revertData(row.index, e.currentTarget.name === "cancel")
        }
    }

    const removeRow = () => {
        table.options.meta?.removeRow(row.index)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', '& > *': { m: 1, } }}>
            {table.options.meta?.editedRows[row.id] ? (
                <ButtonGroup size="small" aria-label="small button group">
                    <Button name="cancel" variant="outlined" color="error" onClick={setEditedRows}>⚊</Button>

                    <Button name="done" variant="outlined" color="success" onClick={setEditedRows}>✔</Button>
                </ButtonGroup>
            ) : (
                <ButtonGroup size="small" aria-label="small button group">
                    <Button name="edit" variant="outlined" color="secondary" onClick={setEditedRows}>✐</Button>

                    <Button name="remove" variant="outlined" color="error" onClick={removeRow}>X</Button>
                </ButtonGroup>
            )}
        </Box>
    )
}


export default EditableCell2 