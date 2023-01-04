const express = require('express');

const path = require('path');
const http = require('http');
const app = express();
const server =http.createServer(app);



const cors = require("cors");



app.use(express.static(path.join(__dirname, 'src')))

app.use(
    cors({
      origin: true,
      credentials: true
    })
  );




module.exports = server;
