const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
// const path = require('path');
const http = require('http');
const server = http.createServer(app);

const moment = require('moment')
const cookieParser = require('cookie-parser');
// const cors = require("cors");

const PORT = process.env.PORT || 5500;
//소켓 부분
const socketIO = require('socket.io');
const io = socketIO(server, {
    path: '/socket.io',
    cors: {
        origin: "*",
    },
},
);

// app.use(express.static(path.join(__dirname, 'src')))
app.use(cookieParser());

//몽고디비연결부분
const connect = require("./schemas");
connect();

//소켓 방.채팅창 로직부분
app.set('io', io);
const room = io.of('/room')
const chat = io.of('/chat');


room.on('connection', (socket) => {//게임방에 접속
    console.log('게임방에 입장하셨습니다 ');
    room.emit("notice", {
        message: "게임에 참여하신걸 환영합니다"
    })
    socket.on('disconnect', () => {
        console.log('게임방 접속해제')
    })
})

chat.on('connection', (socket) => {
    console.log('chat 네임스페이스 접속')

    socket.on("test", (data) => {
        const name = data.name;
        const msg = data.msg;
        
        chat.emit("test", {
            name: name,
            msg: msg
        })
    })


})


app.use("/", (req, res) => {
    res.status(200).json("서버 정상 작동 합니다")
})

server.listen(PORT, () => {
    console.log(`PORT 번호 ${PORT} 으로 서버가 실행되었습니다!`)
})
