import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { get, put } from '../../../actions/actionss'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'

const tasksConfigDefault = {
    bestOfferMinPercentage: 0,
    emailTo: "",
    taskAllOffersDelay: 0,
    taskBestOfferFoundDelay: 0,
    taskBestOfferNotFoundDelay: 0,
    taskExceptionDelay: 0
}

export default function TasksConfig() {
    const { control, handleSubmit, reset } = useForm({ defaultValues: tasksConfigDefault })
    const taskConfigId = "otairh8hcDx0lgjkg60l"

    const getTasksConfig = () => {
        get().tasksConfig(taskConfigId).then(response => {
            reset(response.data)
        }).catch(ex => {
            toast.error("Error getting tasks configuration")
            console.log(ex)
        })
    }

    const saveTasksConfig = (data) => {
        put().tasksConfig(taskConfigId, data).then(response => {
            toast.success("Tasks configuration saved")
        }).catch(ex => {
            toast.error("Error saving tasks config")
            console.log(ex)
        })
    }

    React.useEffect(() => {
        getTasksConfig()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Tasks configuration parameters
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="bestOfferMinPercentage"
                        control={control}
                        render={({ field: { onChange, value } }) =>
                            <TextField
                                onChange={onChange}
                                value={value}
                                type="number"
                                label="Best offer min. percentage"
                                fullWidth
                                variant="outlined"
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="emailTo"
                        control={control}
                        render={({ field: { onChange, value } }) =>
                            <TextField
                                onChange={onChange}
                                value={value}
                                label="Email to"
                                fullWidth
                                variant="outlined"
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="taskAllOffersDelay"
                        control={control}
                        render={({ field: { onChange, value } }) =>
                            <TextField
                                onChange={onChange}
                                value={value}
                                type="number"
                                label="Task all offers delay"
                                fullWidth
                                variant="outlined"
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="taskBestOfferFoundDelay"
                        control={control}
                        render={({ field: { onChange, value } }) =>
                            <TextField
                                onChange={onChange}
                                value={value}
                                type="number"
                                label="Task best offer found delay"
                                fullWidth
                                variant="outlined"
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="taskBestOfferNotFoundDelay"
                        control={control}
                        render={({ field: { onChange, value } }) =>
                            <TextField
                                onChange={onChange}
                                value={value}
                                type="number"
                                label="Task best offer not found delay"
                                fullWidth
                                variant="outlined"
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="taskExceptionDelay"
                        control={control}
                        render={({ field: { onChange, value } }) =>
                            <TextField
                                onChange={onChange}
                                value={value}
                                type="number"
                                label="Task exception delay"
                                fullWidth
                                variant="outlined"
                            />
                        }
                    />
                </Grid>
            </Grid>
            <Button
                variant="contained"
                onClick={handleSubmit(saveTasksConfig)}
                sx={{ mt: 3, ml: 1 }}
            >
                Save
            </Button>
        </React.Fragment>
    )
}