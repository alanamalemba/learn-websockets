import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

export default function App() {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    function handleReceiveMessage(data) {
      setReceivedMessage(data.message);
    }

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage); // Cleanup listener
    };
  }, []);

  function sendMessage() {
    if (!room) {
      alert("Please enter a room name first!");
      return;
    }
    socket.emit("send-message", {
      message,
      room,
    });
  }
  

  function handleSetRoom() {
    socket.emit("join-room", {
      room,
    });
  }

  return (
    <div>
      <div className="flex flex-col border h-[200px] gap-8 p-8">
        <input
          type="text"
          placeholder="Room"
          className="border w-[500px] mx-auto"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button
          onClick={handleSetRoom}
          className="bg-gray-500 text-white w-fit p-2 mx-auto"
        >
          Set room
        </button>
        <p>{room}</p>
      </div>

      <div className="flex flex-col border h-[400px] gap-8 p-8">
        <input
          type="text"
          placeholder="Message"
          className="border w-[500px] mx-auto"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-gray-500 text-white w-fit p-2 mx-auto"
        >
          Send message
        </button>
        <p>{receivedMessage}</p>
      </div>
    </div>
  );
}
