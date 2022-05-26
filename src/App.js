import * as React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import ApplicationBar from './components/applicationBar/ApplicationBar';
import ApplicationFooter from './components/ApplicationFooter';
import Login from './components/login/Login';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import TasksConfig from './components/bitcoin/tasksConfig/TasksConfig';
import Offers from './components/bitcoin/offers/Offers';
import { ToastContainer } from 'react-toastify';
import { routes } from './utils/routes';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import F1Schedule from './components/formula1/f1Schedule/F1Schedule';
import { ToggleColorModeContextProvider } from './contexts/ToggleColorModeContext';
import AuthTokenContext, { AuthTokenContextProvider } from './contexts/AuthTokenContext';

function RequireAuth(props) {
  const { children } = props;
  const location = useLocation();
  const { token } = React.useContext(AuthTokenContext);

  if (token)
    return children;
  else
    return <Navigate to={routes.login} state={{ from: location }} replace />;
}

function App() {
  return (
    <AuthTokenContextProvider>
      <ToggleColorModeContextProvider>
        <BrowserRouter>
          <CssBaseline />
          <ToastContainer position="bottom-center" />
          <ApplicationBar>
            <Container>
              <Routes>
                <Route path={routes.login} element={<Login />} />
                <Route path={routes.f1Schedule} element={<F1Schedule />} />
                <Route path={routes.offers} element={<RequireAuth><Offers /></RequireAuth>} />
                <Route path={routes.tasksConfig} element={<RequireAuth><TasksConfig /></RequireAuth>} />
              </Routes>
              <ApplicationFooter />
            </Container>
          </ApplicationBar>
        </BrowserRouter>
      </ToggleColorModeContextProvider>
    </AuthTokenContextProvider>
  );
}

export default App;
