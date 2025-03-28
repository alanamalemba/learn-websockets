import React, { useState } from "react";
import Login from "./components/Login";
import { Home } from "./components/Home";

export default function App() {
  const [username, setUsername] = useState("");

  return username ? (
    <Home username={username} />
  ) : (
    <Login onSubmit={setUsername} />
  );
}
