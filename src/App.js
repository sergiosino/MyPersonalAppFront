import * as React from 'react'
import 'App.css'
import 'react-toastify/dist/ReactToastify.css'
import ApplicationBar from 'components/common/applicationBar/ApplicationBar'
import ApplicationFooter from 'components/common/ApplicationFooter'
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { ToggleColorModeContextProvider } from 'contexts/ToggleColorModeContext'
import { AuthContextProvider } from 'contexts/AuthContext'
import AllRoutes from "components/routes/AllRoutes"
import { AxiosInterceptor } from 'utils/axiosInstance'

function App() {
  return (
    <AuthContextProvider>
      <ToggleColorModeContextProvider>
        <BrowserRouter>
          <AxiosInterceptor>
            <CssBaseline />
            <ToastContainer position="bottom-right" />
            <ApplicationBar>
              <Container fixed maxWidth={false} sx={{ mt: 8 }}>
                <AllRoutes />
                <ApplicationFooter />
              </Container>
            </ApplicationBar>
          </AxiosInterceptor>
        </BrowserRouter>
      </ToggleColorModeContextProvider>
    </AuthContextProvider>
  )
}

export default App
