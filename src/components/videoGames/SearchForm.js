import * as React from "react"
import { Grid, Button } from "@mui/material"
import TextFieldForm from "components/common/TextFieldForm"
import SelectFieldForm from "components/common/SelectFieldForm"
import { useForm } from 'react-hook-form'
import { usePlatforms } from "hooks/videoGames/usePlatforms"
import { useNavigate, useParams } from "react-router-dom"
import { routes } from "constants/routes"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export default function SearchForm() {
    const { platforms } = usePlatforms()
    const { platformId, keyword } = useParams()
    const navigate = useNavigate()

    const schema = yup.object().shape({
        videoGameName: yup.string().required("Required field").default(keyword ?? ""),
        platform: yup.string().required("Required field").default(platformId ?? ""),
    });
    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: schema.cast(), resolver: yupResolver(schema) })

    const handleSearch = (data) => {
        navigate(routes.searchResults.replace(":keyword", data.videoGameName).replace(":platformId", data.platform))
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6} lg={4}>
                <TextFieldForm control={control} errors={errors} name="videoGameName" label="Game name" />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <SelectFieldForm control={control} errors={errors} name="platform" label="Platform" options={platforms} optionsLabelName="name" />
            </Grid>
            <Grid item xs={12} sm={12} lg={4} sx={{ textAlign: "left", alignSelf: "center" }}>
                <Button variant="contained" onClick={handleSubmit(handleSearch)} sx={{ width: "100%" }}>
                    Search
                </Button>
            </Grid>
        </Grid>
    )
}

