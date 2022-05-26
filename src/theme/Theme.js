
const getDesignTheme = (mode) => {
    return {
        palette: {
            mode,
            ...(mode === 'light' ? lightTheme : darkTheme),
        },
    }
};

const lightTheme = {
    primary: {
        main: '#711010',
    },
    secondary: {
        main: '#060606',
    },
    background: {
        default: '#FFFFFF',
        paper: '#fff',
    },
};

const darkTheme = {
}

export default getDesignTheme;
