import * as React from 'react'
import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'

export default function TextFieldForm(props) {
    const { control, name, label, errors } = props

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) =>
                <TextField
                    sx={{h: 10}}
                    size="small"
                    onChange={onChange}
                    value={value}
                    label={label}
                    fullWidth
                    variant="outlined"
                    error={errors[name] ? true : false}
                    helperText={errors[name]?.message}
                />
            }
        />
    )
}