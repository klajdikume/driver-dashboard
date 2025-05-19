import signalRService from "../signalRService";
import { useEffect } from "react";

export function useViolationSocket(onSingleDriveTime) {
  useEffect(() => {
    signalRService.startConnection();

    signalRService.addSingleDriveTimeViolationListener((violation) => {
      console.log("Received new single drive time violation:", violation);
      onSingleDriveTime(violation);
    });
  }, [onSingleDriveTime]);
}
