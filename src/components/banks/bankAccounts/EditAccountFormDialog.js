import * as React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Divider, Stack } from '@mui/material'
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import TextFieldForm from "components/common/form/TextFieldForm"

export default function EditAccountFormDialog(props) {
    const { open, accountInfo, handleClose, handleSaveAccountClick } = props

    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

    const schema = yup.object().shape({
        id: yup.string().default(accountInfo?.id),
        name: yup.string().max(50, "You have exceeded the maximum of 50 characters").default(accountInfo?.name ?? ""),
        iban: yup.string().default(accountInfo?.iban ?? ""),
        balanceAmount: yup.string().default(accountInfo?.balanceAmount ?? ""),
        balanceCurrency: yup.string().default(accountInfo?.balanceCurrency ?? ""),
        otherComments: yup.string().max(500, "You have exceeded the maximum of 500 characters").default(accountInfo?.otherComments ?? "")
    });
    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: schema.cast(), resolver: yupResolver(schema) })

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            fullWidth={true}
            maxWidth="md">
            <DialogTitle>Edit account</DialogTitle>
            <Divider />
            <DialogContent>
                <Stack sx={{ mt: 1 }} spacing={2}>
                    <TextFieldForm control={control} errors={errors} name="name" label="Name" />
                    <TextFieldForm control={control} errors={errors} name="iban" label="IBAN" disabled />
                    <Stack spacing={1} direction="row">
                        <TextFieldForm control={control} errors={errors} name="balanceAmount" label="Balance amount" disabled />
                        <TextFieldForm control={control} errors={errors} name="balanceCurrency" label="Balance currency" disabled />
                    </Stack>
                    <TextFieldForm control={control} errors={errors} name="otherComments" label="Other comments" multiline rows={5} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained" onClick={handleSubmit(handleSaveAccountClick)}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}