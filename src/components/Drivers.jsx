import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import signalRService from "../signalRService";

export default function Drivers() {

  const [totalHourDrive, setTotalHourDrive] = useState(0);
  const [totalHourRest, settotalHourRest] = useState(0);

   useEffect(() => {
    fetch('http://localhost:5247/totalhourswithtype')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((activity) => {
        console.log(activity);

        if(activity.type.trim() === 'Driving') {
          console.log(activity);
          setTotalHourDrive(activity.totalHours);
        }
        if(activity.type.trim() === 'Resting') {
          settotalHourRest(activity.totalHours)
        }
      })
    });

    signalRService.startConnection();

    signalRService.addMessageListener((newMessage) => {
      console.log(newMessage.totalHours);
      newMessage.totalHours.forEach((activity) => {
        if(activity.type.trim() === 'Driving') {
          console.log(activity);
          setTotalHourDrive(activity.totalHours);
        }
        if(activity.type.trim() === 'Resting') {
          settotalHourRest(activity.totalHours)
        }
      })
    });

    return () => {
      signalRService.stopConnection();
    }

   }, [totalHourDrive, totalHourRest]);

    return ( 
      <>
        <Box sx={{ minWidth: 275, maxWidth: 300 }}>
          <Card variant="outlined">
            <React.Fragment>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                { totalHourDrive }
                </Typography>
                <Typography variant="h5" component="div">
                  Driving Hours
                </Typography>
                
                </CardContent>
            </React.Fragment>
        </Card>
        </Box>
        <Box sx={{ minWidth: 275, maxWidth: 300 }}>
          <Card variant="outlined">

          <React.Fragment>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                { totalHourRest }
                </Typography>
                <Typography variant="h5" component="div">
                  Resting Hours
                </Typography>
                
                </CardContent>
            </React.Fragment>
            
          </Card>
        </Box>
      </>
    );
}