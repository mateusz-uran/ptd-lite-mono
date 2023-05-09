import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export default function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
        </Box>
    );
}