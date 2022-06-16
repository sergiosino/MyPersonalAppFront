import { styled } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
}));

export default function PageWorkInProgress() {
    return (
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h4" paragraph>
                Sorry, this page is under construction!
            </Typography>
            <Typography>
                We are working as best and as quickly as possible to finalize it.
                Visit our website from time to time to check the progress.
            </Typography>
            <Box
                component="img"
                src="/static/illustrations/workInProgress.svg"
                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
            />
        </ContentStyle>
    );
}