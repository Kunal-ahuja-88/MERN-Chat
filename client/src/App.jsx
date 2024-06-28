

import { Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState,useMemo } from 'react';
import { io } from "socket.io-client";
import { Container } from "@mui/material";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"),[])

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();  // Corrected the spelling here
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.on("receive-message",(data) => {
      console.log(data)
    })

    socket.on("welcome", (s) => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="div" gutterBottom>
        Welcome to Chat
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic" 
          label="Outlined" 
          variant="outlined" 
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
    </Container>
  );
};

export default App;
