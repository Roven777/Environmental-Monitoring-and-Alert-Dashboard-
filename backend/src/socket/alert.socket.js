const handleAlertSocket = (io, socket) => {

  socket.on("subscribe-alerts", () => {
    console.log("Client subscribed to alerts:", socket.id);
  });

};

module.exports = handleAlertSocket;
