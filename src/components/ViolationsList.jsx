import React from 'react';
import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Chip,
} from '@mui/material';
import { format } from 'date-fns';

const ViolationsList = ({ title, violations, drivers }) => {
    const getDriverName = (driverId) => {
        return drivers.find(d => d.id === driverId)?.name || 'Unknown Driver';
    };

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <Paper className="p-4">
            <Typography variant="h6" className="mb-3">
                {title}
                <Chip
                    label={violations.length}
                    color="error"
                    size="small"
                    className="ml-2"
                />
            </Typography>
            <List>
                {violations.map((violation, index) => (
                    <ListItem
                        key={`${violation.driverId}-${index}`}
                        className="border-b last:border-b-0"
                    >
                        <ListItemText
                            primary={getDriverName(violation.driverId)}
                            secondary={
                                <>
                                    <Typography component="span" variant="body2" color="text.primary">
                                        Duration: {formatDuration(violation.duration)}
                                        {' (Limit: '}{formatDuration(violation.limit)})
                                    </Typography>
                                    <br />
                                    <Typography component="span" variant="body2">
                                        {format(new Date(violation.startTime), 'PPp')} - {format(new Date(violation.endTime), 'PPp')}
                                    </Typography>
                                </>
                            }
                        />
                    </ListItem>
                ))}
                {violations.length === 0 && (
                    <ListItem>
                        <ListItemText
                            primary="No violations found"
                            className="text-gray-500"
                        />
                    </ListItem>
                )}
            </List>
        </Paper>
    );
};

export default ViolationsList; 