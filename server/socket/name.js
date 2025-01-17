import Server from 'socket.io'
import http from 'http'
import express from 'express'

const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        method:['GET','POST']
    }
});
const userSocketMap={};
const getReceiverSocketId=(recieverId)=>{
    return userSocketMap[recieverId]
}
io.on('connection',(socket)=>{
    console.log("user connnected ",socket.id);
    const userId=socket.handshake.userId;
    if(userId)
        userSocketMap[userId]=socket.id;
    io.emit('getOnlineUsers',Object.keys(userSocketMap));
    socket.on('disconnect',(socket)=>{
        console.log("user disconnnected ",socket.id);
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    })
})