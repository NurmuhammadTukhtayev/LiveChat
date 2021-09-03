const express=require('express')
const app=express()
const http=require('http')
const cors=require('cors')
const { Server }=require('socket.io')

app.use(cors())
const server=http.createServer(app)

const io=new Server(server, {
    cors:{
        origin:"http://localhost:3000"
    }
})

io.on("connection", (socket)=>{
    //determine who joins to room
    socket.on('join_room', (data)=>{
        socket.join(data)
        console.log(`User connected with id ${socket.id} to room ${data}`)
    })

    socket.on('send_message', (data)=>{
        socket.to(data.room).emit('receive_message', data)
        console.log(data)
    })

    socket.on('disconnect', ()=>{
        console.log(socket.id+" user disconnected")
    })
})


server.listen(3001, ()=>console.log("Server is running"))