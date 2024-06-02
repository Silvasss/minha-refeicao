import { useEffect, useState } from "react"

import Input from '@mui/material/Input'


const EditableCell = ({ getValue, row, column, table }) => {
    const initialValue = getValue()

    const [value, setValue] = useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
        table.options.meta?.updateData(row.index, column.id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    if (table.options.meta?.editedRows[row.id]) {
        return <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            variant="filled"
            size="sm"
            w="85%"
            overflow="hidden"
            type={column.columnDef.meta?.type || "text"}
        />
    }

    return value
}


export default EditableCell