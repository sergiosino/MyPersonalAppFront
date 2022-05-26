import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getDesignTheme from '../theme/Theme';

const ToggleColorModeContext = React.createContext({ toggleColorMode: () => { } });

export function ToggleColorModeContextProvider(props) {
    const { children } = props;

    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(() => createTheme(getDesignTheme(mode)), [mode]);

    return (
        <ToggleColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ToggleColorModeContext.Provider>
    );
}

export default ToggleColorModeContext;