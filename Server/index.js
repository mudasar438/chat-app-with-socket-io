 const express = require('express');
 const app = express();
 const http = require('http')
 const cors = require('cors');
 const {Server} = require("socket.io")


 app.use(cors());
 const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST","PUT","DELETE"],
    }
});

  io.on('connection',(socket)=>{
    console.log(`user Connected : ${socket.id}`);

    socket.on("join-room",(data)=>{
        socket.join(data.room);
        console.log(`user with ID : ${socket.id} ,  user joined room : ${data.room}`); 

    })
    socket.on("send_message",(data)=>{
        console.log("data from From-End", data)
       socket.in(data.room).emit("receive_message",data);
    })
    socket.on("disconnect",()=>{
        console.log("user disconnected : ", socket.id);
    })
  })
 server.listen(8000, () => {
    console.log('Server is running on port 8000');

 })

