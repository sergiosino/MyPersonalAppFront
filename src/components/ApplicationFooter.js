import * as React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinkNewTab from './LinkNewTab';

export default function ApplicationFooter() {

    return (
        <Box sx={{ p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
                Made for fun!
            </Typography>
            <Typography variant="body2" align="center">
                {"Copyright © "}
                <LinkNewTab underline="always" href="https://sergiosino.github.io/SimpleCardsGame/">
                    Website
                </LinkNewTab>
                {` ${new Date().getFullYear()}.`}
            </Typography>
        </Box>
    );
}