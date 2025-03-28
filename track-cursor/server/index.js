import http from "http";
import url from "url";
import { v4 as uuidv4 } from "uuid";
import { WebSocketServer } from "ws";

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

const port = 3000;

const connections = {};
const users = {};

function broadcast() {
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid];
    const message = JSON.stringify(users);
    connection.send(message);
  });
}

function handleMessage(messageInBytes, uuid) {
  // {"x":200, "y":300}

  const message = JSON.parse(messageInBytes.toString());
  users[uuid].state = message;
  console.log(message);

  broadcast();
}

function handleClose(uuid) {
  delete connections[uuid];
  delete users[uuid];

  broadcast()
}

wsServer.on("connection", (connection, request) => {
  // ws://localhost:{PORT}?username=Alan

  const { username } = url.parse(request.url, true).query;

  const uuid = uuidv4();

  console.log(username);
  console.log(uuid);

  connections[uuid] = connection;

  users[uuid] = {
    username,
    state: {
      x: 0,
      y: 0,
    },
  };

  connection.on("message", (message) => handleMessage(message, uuid));
  connection.on("close", () => handleClose(uuid));
});

server.listen(port, () => {
  console.log(`Server listening to port: ${port}`);
});
