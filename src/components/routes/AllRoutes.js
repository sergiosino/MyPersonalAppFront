import * as React from 'react'
import { routes } from 'utils/routes'
import AuthContext from 'contexts/AuthContext'
import { Route, Routes, useNavigate } from "react-router-dom"
import Login from 'components/login/Login'
import Register from 'components/register/Register'
import TasksConfig from 'components/bitcoin/tasksConfig/TasksConfig'
import Offers from 'components/bitcoin/offers/Offers'
import F1Schedule from 'components/formula1/f1Schedule/F1Schedule'
import ReleaseDates from 'components/releaseDates/ReleaseDates'
import Page404 from 'components/websitePages/Page404'
import PageWorkInProgress from 'components/websitePages/PageWorkInProgress'

function RequireAuth(props) {
    const { children } = props
    const navigate = useNavigate()
    const { userInfo } = React.useContext(AuthContext)

    if (userInfo)
        return children
    else
        navigate(routes.login)
}

export default function AllRoutes() {
    return (
        <Routes>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.f1Schedule} element={<F1Schedule />} />
            <Route path={routes.releasesDates} element={<ReleaseDates />} />
            <Route path={routes.offers} element={<RequireAuth><Offers /></RequireAuth>} />
            <Route path={routes.tasksConfig} element={<RequireAuth><TasksConfig /></RequireAuth>} />
            <Route path={routes.banks} element={<RequireAuth><PageWorkInProgress /></RequireAuth>} />
            <Route path="*" element={<Page404/>} />
        </Routes>
    )
}