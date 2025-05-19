import React, { useEffect, useState } from "react";
import {
  Chip,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useViolationSocket } from "../utils/useViolationSocket"; // adjust path if needed

export default function ViolationsList({ title, fetchUrl }) {
  const [violations, setViolations] = useState([]);
  const [latestKey, setLatestKey] = useState(null);

  const getViolationKey = (v) =>
    `${new Date(v.date).toISOString()}_${new Date(v.start).toISOString()}_${new Date(v.end).toISOString()}`;

  // Fetch initial data
  useEffect(() => {
    const fetchViolations = async () => {
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) throw new Error("Failed to fetch violations");
        const data = await response.json();
        setViolations(data);
      } catch (error) {
        console.error("Error fetching violations:", error);
      }
    };

    fetchViolations();
  }, [fetchUrl]);

  // Realtime SignalR updates
  useViolationSocket((newViolation) => {
    const newKey = getViolationKey(newViolation);
    console.log(newViolation);
    
    const alreadyExists = violations.some(
      (v) => getViolationKey(v) === newKey
    );

    if (!alreadyExists) {
      setViolations((prev) => [newViolation, ...prev]);
      setLatestKey(newKey);

      setTimeout(() => {
        setLatestKey(null);
      }, 5000); // Show "New" label for 5s
    }
  });

  return (
    <Paper>
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
        {violations.map((v) => {
          const thisKey = getViolationKey(v);
          return (
            <ListItem key={thisKey} className="border-b last:border-b-0">
              <ListItemText
                primary={
                  <>
                    {v.name}
                    {thisKey === latestKey && (
                      <Chip
                        label="New"
                        color="success"
                        size="small"
                        className="ml-2"
                      />
                    )}
                  </>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Duration: {v.driveTime}h | Limit: {v.limit}h
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      {new Date(v.start).toLocaleTimeString()} –{" "}
                      {new Date(v.end).toLocaleTimeString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
