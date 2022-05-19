import * as React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import ApplicationBar from './components/applicationBar/ApplicationBar';
import ApplicationFooter from './components/ApplicationFooter';
import Container from '@mui/material/Container';
import Login from './components/login/Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import TasksConfig from './components/tasksConfig/TasksConfig';
import Offers from './components/offers/Offers';
import { verifyToken } from './utils/jwtToken';
import { ToastContainer } from 'react-toastify';

const theme = createTheme();

function RequireAuth(props) {
  const { children } = props;
  const location = useLocation();

  if (verifyToken())
    return children;
  else
    return <Navigate to="/" state={{ from: location }} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-center"/>
        <ApplicationBar >
          <Container fixed sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/tasksConfig" element={<RequireAuth><TasksConfig /></RequireAuth>} />
              <Route path="/offers" element={<RequireAuth><Offers /></RequireAuth>} />
            </Routes>
            <ApplicationFooter />
          </Container>
        </ApplicationBar>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
