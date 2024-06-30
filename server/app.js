import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";
import cors from "cors";
import jwt from "jsonwebtoken"

const port=3000;
const secretKey="hf8uur3939i3sd"

const app = express();
const server = createServer(app);

const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods: ["GET","POST"],
    credentials:true,
  },
})

app.use(cors())



const user = true;

io.use((socket,next)=> {
  if(user) 
    next()
})

app.get("/",(req,res)=> {
  res.send("Hello bhai")
})

app.get("/login",(req,res)=> {
  const token = jwt.sign({_id : "fheu38u9eu9weu9"},secretKey)
 
  res.cookie("token",token,
    {httpOnly:true,
     secure:true,
     sameSite:"none"
    }).json({
    message:"Login Success"
    })


})


io.on("connection",(socket)=> {
  console.log("User connected");
  console.log("Id",socket.id)

  socket.on("message",({room,message})=> {
    console.log({room,message})
    io.to(room).emit("receive-message",message)
  })

  socket.on("join-room",(room)=> {
    socket.join(room)
  })
 
  socket.on("disconnect",()=> {
    console.log("User disconnected",socket.id)
  })
})


server.listen(port,()=> {
    console.log(`Server is listening on ${port}`);
});


