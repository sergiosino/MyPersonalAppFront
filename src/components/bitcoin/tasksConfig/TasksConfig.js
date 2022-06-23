import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import TextFieldForm from 'components/common/form/TextFieldForm'
import NumericFieldForm from 'components/common/form/NumericFieldForm'
import * as yup from "yup"
import { useTasksConfig } from 'hooks/bitcoin/useTasksConfig'
import { yupResolver } from '@hookform/resolvers/yup'

export default function TasksConfig() {
    const { tasksConfig, updateTasksConfig } = useTasksConfig()

    const schema = yup.object().shape({
        bestOfferMinPercentage: yup.string().required("Required field").default(tasksConfig?.bestOfferMinPercentage ?? 0),
        emailTo: yup.string().required("Required field").default(tasksConfig?.emailTo ?? ""),
        taskAllOffersDelay: yup.number().required("Required field").default(tasksConfig?.taskAllOffersDelay ?? 0),
        taskBestOfferFoundDelay: yup.number().required("Required field").default(tasksConfig?.taskBestOfferFoundDelay ?? 0),
        taskBestOfferNotFoundDelay: yup.number().required("Required field").default(tasksConfig?.taskBestOfferNotFoundDelay ?? 0),
        taskExceptionDelay: yup.number().required("Required field").default(tasksConfig?.taskExceptionDelay ?? 0)
    });
    const { control, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: schema.cast(), resolver: yupResolver(schema) })

    const saveTasksConfig = (data) => {
        updateTasksConfig(data)
    }

    React.useEffect(() => {
        if (tasksConfig) reset(tasksConfig)
    }, [tasksConfig, reset])

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Tasks configuration parameters
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <NumericFieldForm name="bestOfferMinPercentage" control={control} label="Best offer min. percentage" errors={errors} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextFieldForm name="emailTo" control={control} label="Email to" errors={errors} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <NumericFieldForm name="taskAllOffersDelay" control={control} label="Task all offers delay" errors={errors} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <NumericFieldForm name="taskBestOfferFoundDelay" control={control} label="Task best offer found delay" errors={errors} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <NumericFieldForm name="taskBestOfferNotFoundDelay" control={control} label="Task best offer not found delay" errors={errors} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <NumericFieldForm name="taskExceptionDelay" control={control} label="Task exception delay" errors={errors} />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit(saveTasksConfig)}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}