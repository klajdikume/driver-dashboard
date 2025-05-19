import { HubConnectionBuilder } from "@microsoft/signalr";

const signalRService = {
  connection: null,
  startConnection: function() {
    this.connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5247/drivers")
        .withAutomaticReconnect()
        .build();

    this.connection.start().then(() => {
      console.log("SignalR connection established.");
    }).catch((error) => {
      console.error("Error starting SignalR connection:", error);
    });
  },
  addMessageListener: function(callback) {
    if (this.connection) {
      this.connection.on("DriverUpdated", message => {
        callback(message);
      });
    }
  },
  addSingleDriveTimeViolationListener: function (callback) {
    if (this.connection) {
      this.connection.on("SingleDriveTimeViolation", callback);
    }
  },
};

export default signalRService;