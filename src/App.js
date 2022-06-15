import * as React from 'react'
import 'App.css'
import 'react-toastify/dist/ReactToastify.css'
import ApplicationBar from 'components/applicationBar/ApplicationBar'
import ApplicationFooter from 'components/ApplicationFooter'
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { ToggleColorModeContextProvider } from 'contexts/ToggleColorModeContext'
import { AuthContextProvider } from 'contexts/AuthContext'
import AllRoutes from "components/routes/AllRoutes"

function App() {
  return (
    <AuthContextProvider>
      <ToggleColorModeContextProvider>
        <BrowserRouter>
          <CssBaseline />
          <ToastContainer position="bottom-center" />
          <ApplicationBar>
            <Container fixed sx={{ mt: 10 }}>
              <AllRoutes />
              <ApplicationFooter />
            </Container>
          </ApplicationBar>
        </BrowserRouter>
      </ToggleColorModeContextProvider>
    </AuthContextProvider>
  )
}

export default App
