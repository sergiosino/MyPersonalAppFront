import * as React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import getDesignTheme from "theme/Theme"
import { STORAGE_THEME } from "constants/constants"

const ToggleColorModeContext = React.createContext({ toggleColorMode: () => { } })

export function ToggleColorModeContextProvider(props) {
    const { children } = props

    const [mode, setMode] = React.useState(localStorage.getItem(STORAGE_THEME) ?? "light")

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === "light" ? "dark" : "light"
                    localStorage.setItem(STORAGE_THEME, newMode)
                    return newMode
                })
            },
        }),
        [],
    )

    const theme = React.useMemo(() => createTheme(getDesignTheme(mode)), [mode])

    return (
        <ToggleColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ToggleColorModeContext.Provider>
    )
}

export default ToggleColorModeContext