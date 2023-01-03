const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server =http.createServer(app);
const PORT = process.env.PORT||3500;

const socketIO = require('socket.io');
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'src')))

//소켓부분



io.on('connection', (socket)=>{
    socket.on('chatting', (data)=>{
        console.log(data)
        io.emit('test' , data  )
    })
})


server.listen(PORT , () =>{
    console.log(`PORT 번호 ${PORT} 으로 서버가 실행되었습니다!`)
})

