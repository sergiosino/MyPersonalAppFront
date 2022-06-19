import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useTasksConfigActions } from "hooks/actions/useTasksConfigActions"
import TextFieldForm from 'components/common/TextFieldForm'
import NumericFieldForm from 'components/common/NumericFieldForm'

const tasksConfigDefault = {
    bestOfferMinPercentage: 0,
    emailTo: "",
    taskAllOffersDelay: 0,
    taskBestOfferFoundDelay: 0,
    taskBestOfferNotFoundDelay: 0,
    taskExceptionDelay: 0
}

export default function TasksConfig() {
    const { getTasksConfig, putTasksConfig } = useTasksConfigActions();
    const { control, handleSubmit, reset } = useForm({ defaultValues: tasksConfigDefault })

    const saveTasksConfig = (data) => {
        putTasksConfig(data).then(() => {
            toast.success("Tasks configuration saved")
        }).catch(ex => {
            console.log(ex)
            toast.error("Error saving tasks config")
        })
    }

    React.useEffect(() => {
        getTasksConfig().then(response => {
            reset(response.data)
        }).catch(ex => {
            console.log(ex)
            toast.error("Error getting tasks configuration")
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Tasks configuration parameters
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <NumericFieldForm name="bestOfferMinPercentage" control={control} label="Best offer min. percentage"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextFieldForm name="emailTo" control={control} label="Email to" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <NumericFieldForm name="taskAllOffersDelay" control={control} label="Task all offers delay"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <NumericFieldForm name="taskBestOfferFoundDelay" control={control} label="Task best offer found delay"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <NumericFieldForm name="taskBestOfferNotFoundDelay" control={control} label="Task best offer not found delay"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <NumericFieldForm name="taskExceptionDelay" control={control} label="Task exception delay"/>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
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