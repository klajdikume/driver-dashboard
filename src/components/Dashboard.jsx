import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, TextField, Autocomplete } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import ViolationsList from './ViolationsList';
import DriverDetails from './DriverDetails';
import StatsTiles from './StatsTiles';

const Dashboard = () => {
    const [filters, setFilters] = useState({
        startDate: null,
        endDate: null,
        driverIds: [],
    });

    const [drivers, setDrivers] = useState([]);
    const [violations, setViolations] = useState([]);
    const [stats, setStats] = useState({
        totalDrivingTimeAllDrivers: 0,
        totalRestTimeAllDrivers: 0,
        activeDrivers: 0,
        totalViolations: 0,
    });
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [driverStats, setDriverStats] = useState(null);

    // Filter handlers
    const handleDateChange = (type, date) => {
        setFilters(prev => ({
            ...prev,
            [type === 'start' ? 'startDate' : 'endDate']: date
        }));
    };

    const handleDriverSelection = (value) => {
        setFilters(prev => ({
            ...prev,
            driverIds: value
        }));
    };

    // Group violations by type
    const getViolationsByType = (type) => {
        return violations.filter(v => v.violationType === type);
    };

    return (
        <Box className="p-6">
            <Paper className="p-4 mb-6">
                <Typography variant="h4" className="mb-4">Driver Dashboard</Typography>
                
                {/* Filters */}
                <Grid container spacing={3} className="mb-6">
                    <Grid item xs={12} md={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Start Date"
                                value={filters.startDate}
                                onChange={(date) => handleDateChange('start', date)}
                                className="w-full"
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="End Date"
                                value={filters.endDate}
                                onChange={(date) => handleDateChange('end', date)}
                                className="w-full"
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            multiple
                            options={drivers.map(d => d.id)}
                            getOptionLabel={(id) => drivers.find(d => d.id === id)?.name || id}
                            value={filters.driverIds}
                            onChange={(_, value) => handleDriverSelection(value)}
                            renderInput={(params) => (
                                <TextField {...params} label="Select Drivers" />
                            )}
                        />
                    </Grid>
                </Grid>

                {/* Stats Tiles */}
                <StatsTiles stats={stats} />

                {/* Violations Lists */}
                <Grid container spacing={3} className="mt-6">
                    <Grid item xs={12} md={6}>
                        <ViolationsList
                            title="Single Drive Time Violations"
                            violations={getViolationsByType('single')}
                            drivers={drivers}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ViolationsList
                            title="Rest Time Violations"
                            violations={getViolationsByType('rest')}
                            drivers={drivers}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ViolationsList
                            title="Day Drive Time Violations"
                            violations={getViolationsByType('daily')}
                            drivers={drivers}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ViolationsList
                            title="Week Drive Time Violations"
                            violations={getViolationsByType('weekly')}
                            drivers={drivers}
                        />
                    </Grid>
                </Grid>

                {/* Selected Driver Details */}
                {selectedDriver && driverStats && (
                    <DriverDetails
                        driver={drivers.find(d => d.id === selectedDriver)}
                        stats={driverStats}
                    />
                )}
            </Paper>
        </Box>
    );
};

export default Dashboard; 