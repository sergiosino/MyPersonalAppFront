import * as React from 'react'
import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'

export default function NumericFieldForm(props) {
    const { control, name, label } = props

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) =>
                <TextField
                    size="small"
                    onChange={onChange}
                    value={value}
                    type="number"
                    label={label}
                    fullWidth
                    variant="outlined"
                />
            }
        />
    )
}