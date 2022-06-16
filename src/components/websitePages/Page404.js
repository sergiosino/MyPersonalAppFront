import { styled } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
}));

export default function Page404() {
    return (
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h4" paragraph>
                Sorry, page not found!
            </Typography>
            <Typography>
                Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
                sure to check your spelling.
            </Typography>
            <Box
                component="img"
                src="/static/illustrations/error404.svg"
                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
            />
        </ContentStyle>
    );
}