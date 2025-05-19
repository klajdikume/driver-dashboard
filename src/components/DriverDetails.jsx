import React from 'react';
import { Paper, Typography, Grid, LinearProgress } from '@mui/material';
import { format } from 'date-fns';

const DriverDetails = ({ driver, stats }) => {
    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const calculateProgress = (remaining, total) => {
        return ((total - remaining) / total) * 100;
    };

    // Constants for time limits (in minutes)
    const DAILY_DRIVE_LIMIT = 9 * 60; // 9 hours
    const DAILY_REST_LIMIT = 11 * 60; // 11 hours

    return (
        <Paper className="p-6 mt-6">
            <Typography variant="h5" className="mb-4">
                Driver Details: {driver.name}
            </Typography>
            
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <div className="mb-4">
                        <Typography variant="subtitle1" color="text.secondary">
                            Current Status
                        </Typography>
                        <Typography variant="h6" className="capitalize">
                            {driver.currentStatus}
                            <Typography component="span" variant="body2" className="ml-2 text-gray-500">
                                (since {format(new Date(driver.lastStatusChange), 'PPp')})
                            </Typography>
                        </Typography>
                    </div>

                    <div className="mb-4">
                        <Typography variant="subtitle1" color="text.secondary">
                            Next Daily Rest Due
                        </Typography>
                        <Typography variant="h6">
                            {format(new Date(stats.nextDailyRest), 'PPp')}
                        </Typography>
                    </div>
                </Grid>

                <Grid item xs={12} md={6}>
                    <div className="mb-6">
                        <div className="flex justify-between mb-1">
                            <Typography variant="subtitle2">
                                Remaining Driving Time
                            </Typography>
                            <Typography variant="body2">
                                {formatDuration(stats.remainingDrivingTime)} / {formatDuration(DAILY_DRIVE_LIMIT)}
                            </Typography>
                        </div>
                        <LinearProgress
                            variant="determinate"
                            value={calculateProgress(stats.remainingDrivingTime, DAILY_DRIVE_LIMIT)}
                            color="primary"
                            className="h-2 rounded"
                        />
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between mb-1">
                            <Typography variant="subtitle2">
                                Remaining Rest Time
                            </Typography>
                            <Typography variant="body2">
                                {formatDuration(stats.remainingRestTime)} / {formatDuration(DAILY_REST_LIMIT)}
                            </Typography>
                        </div>
                        <LinearProgress
                            variant="determinate"
                            value={calculateProgress(stats.remainingRestTime, DAILY_REST_LIMIT)}
                            color="secondary"
                            className="h-2 rounded"
                        />
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <div className="grid grid-cols-2 gap-4">
                        <Paper className="p-4 bg-blue-50">
                            <Typography variant="subtitle2" color="text.secondary">
                                Total Driving Time Today
                            </Typography>
                            <Typography variant="h6">
                                {formatDuration(stats.totalDrivingTime)}
                            </Typography>
                        </Paper>
                        <Paper className="p-4 bg-green-50">
                            <Typography variant="subtitle2" color="text.secondary">
                                Total Rest Time Today
                            </Typography>
                            <Typography variant="h6">
                                {formatDuration(stats.totalRestTime)}
                            </Typography>
                        </Paper>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DriverDetails; 