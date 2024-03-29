import * as React from 'react'
import { routes } from 'constants/routes'
import AuthContext from 'contexts/AuthContext'
import { Route, Routes, useNavigate, Navigate } from "react-router-dom"
import Login from 'components/login/Login'
import Register from 'components/register/Register'
import TasksConfig from 'components/bitcoin/tasksConfig/TasksConfig'
import Offers from 'components/bitcoin/offers/Offers'
import F1Schedule from 'components/formula1/f1Schedule/F1Schedule'
import ReleaseDates from 'components/games/releaseDates/ReleaseDates'
import Page404 from 'components/common/websitePages/Page404'
// import PageWorkInProgress from 'components/common/websitePages/PageWorkInProgress'
import BankAccounts from 'components/banks/bankAccounts/BankAccounts'
import SearchResults from 'components/games/searchResults/SearchResults'

function RequireAuth(props) {
    const { children } = props
    const navigate = useNavigate()
    const { userInfo } = React.useContext(AuthContext)

    React.useEffect(() => {
        if (!userInfo)
            navigate(routes.login)
    }, [userInfo, children, navigate])

    if (userInfo)
        return children
}

export default function AllRoutes() {
    return (
        <Routes>
            <Route path={routes.index} element={<Navigate to={routes.f1Schedule} replace />} />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.f1Schedule} element={<F1Schedule />} />
            <Route path={routes.releasesDates} element={<ReleaseDates />} />
            <Route path={routes.searchResults} element={<SearchResults />} />
            <Route path={routes.offers} element={<RequireAuth><Offers /></RequireAuth>} />
            <Route path={routes.tasksConfig} element={<RequireAuth><TasksConfig /></RequireAuth>} />
            <Route path={routes.myBankAccounts} element={<RequireAuth><BankAccounts /></RequireAuth>} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    )
}