import * as React from "react"
import { Grid, Button } from "@mui/material"
import TextFieldForm from "components/common/form/TextFieldForm"
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from "react-router-dom"
import { routes } from "constants/routes"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export default function SearchForm() {
    const { keyword } = useParams()
    const navigate = useNavigate()

    const schema = yup.object().shape({
        videoGameName: yup.string().required("Required field").default(keyword ?? "")
    });
    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: schema.cast(), resolver: yupResolver(schema) })

    const handleSearch = (data) => {
        navigate(routes.searchResults.replace(":keyword", data.videoGameName))
    }

    return (
        <form onSubmit={handleSubmit(handleSearch)}>
            <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                <Grid item xs={12} sm={6} lg={4}>
                    <TextFieldForm control={control} errors={errors} name="videoGameName" label="Game name" />
                </Grid>
                <Grid item xs={12} sm={4} lg={2} sx={{ textAlign: "left" }}>
                    <Button type="submit" variant="contained" sx={{ width: "100%" }}>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

