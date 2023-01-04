const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 3500;
const moment = require('moment')
const cors = require("cors");
const socketIO = require('socket.io');
const io = socketIO(server, {
    cors: {
        origin: "*"
    }
});
app.use(express.static(path.join(__dirname, 'src')))

app.use(
    cors({
        origin: true,
        credentials: true
    })
);


//소켓 통신 부분

io.on('connection', (socket) => {

    socket.on('chatting', (data) => {
        const { name, msg } = data;
        io.emit('chatting', {
            name: name,
            msg: msg,
            time: moment(new Date()).format("h:ss A")  //현재시간
        })
    })
})


server.listen(PORT, () => {
    console.log(`PORT 번호 ${PORT} 으로 서버가 실행되었습니다!`)
})

