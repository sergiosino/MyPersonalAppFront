import * as React from 'react'
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import { Controller } from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText'

export default function SelectFieldForm(props) {
    const { control, name, label, options, optionsLabelName, errors } = props

    const getSelectOptions = () => options ? (
        options.map((option) =>
            <MenuItem key={option.id} value={option.id}>
                {option[optionsLabelName]}
            </MenuItem>
        )
    ) : null

    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <FormControl
                        fullWidth
                        size="small"
                        error={errors[name] ? true : false}
                    >
                        <InputLabel id={`select-${name}`}>
                            {options ? label : "Loading..."}
                        </InputLabel>
                        <Select
                            labelId={`select-${name}`}
                            onChange={onChange}
                            value={value}
                            label={label}
                        >
                            {getSelectOptions()}
                        </Select>
                        <FormHelperText>{errors[name]?.message}</FormHelperText>
                    </FormControl>
                )}
            />
        </>
    )
}