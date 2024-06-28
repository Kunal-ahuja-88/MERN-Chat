

import { Button, TextField, Typography } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import {io} from "socket.io-client"
import {Container} from "@mui/material"

const handleSubmit = (e) => {

}

const App= ()=>{
  const socket = io("http://localhost:3000")

  useEffect(() => {
  socket.on("connect" , () => {
    console.log("connected",socket.id)
  })

    socket.on("welcome",(s)=> {
      console.log(s)
    })

    return () => {
      socket.disconnect()
    }
  
  },[])

  return (
   <Container maxWidth = "sm">
    <Typography variant = "h1" component="div" gutterBottom>
      Welcome to Chat
    </Typography>

    <form onSubmit={handleSubmit}>
      <TextField id = "outlined-basic" label="Outlined" variant="outlined" />
      <Button variant ="contained" color="primary">Send</Button>
    </form>
   </Container>
  )
}

export default App

