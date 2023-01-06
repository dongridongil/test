const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server =http.createServer(app);
const PORT = process.env.PORT||3500;
const moment = require('moment')
const cookieParser = require('cookie-parser');
const cors = require("cors");
const socketIO = require('socket.io');
const io = socketIO(server, {
    path: '/socket.io',
    cors: {
        origin: "*",
    },
},
);

app.use(express.static(path.join(__dirname, 'src')))
app.use(cookieParser());

const chat = io.of('/chat');
app.set('io', io);
chat.on('connection' , (socket)=>{
    console.log('chat 네임스페이스 접속')
	 
	  socket.on("test", (data) => {
	const  name = data.name;
	const  msg = data.msg;
  	
	 socket.emit("test",{
                name,
                msg
				})

		 
	  })
	socket.on("test2", (data) =>{
           console.log(data)
       })
       
   
})


server.listen( PORT , () =>{
    console.log(`PORT 번호 ${PORT} 으로 서버가 실행되었습니다!`)
})
