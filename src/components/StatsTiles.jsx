import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import {
    DirectionsCar as DriveIcon,
    Hotel as RestIcon,
    Group as DriversIcon,
    Warning as ViolationIcon,
} from '@mui/icons-material';

const StatsTiles = ({ stats }) => {
    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const tiles = [
        {
            title: 'Total Driving Time',
            value: formatDuration(stats.totalDrivingTimeAllDrivers),
            icon: <DriveIcon className="text-blue-500" />,
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Total Rest Time',
            value: formatDuration(stats.totalRestTimeAllDrivers),
            icon: <RestIcon className="text-green-500" />,
            bgColor: 'bg-green-50',
        },
        {
            title: 'Active Drivers',
            value: stats.activeDrivers.toString(),
            icon: <DriversIcon className="text-purple-500" />,
            bgColor: 'bg-purple-50',
        },
        {
            title: 'Total Violations',
            value: stats.totalViolations.toString(),
            icon: <ViolationIcon className="text-red-500" />,
            bgColor: 'bg-red-50',
        },
    ];

    return (
        <Grid container spacing={3}>
            {tiles.map((tile, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Paper className={`p-4 ${tile.bgColor} h-full`}>
                        <div className="flex items-center justify-between mb-2">
                            <Typography variant="h6" component="div" className="font-medium">
                                {tile.title}
                            </Typography>
                            {tile.icon}
                        </div>
                        <Typography variant="h4" component="div" className="font-bold">
                            {tile.value}
                        </Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default StatsTiles; 