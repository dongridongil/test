const server = require("./app");
const port = 3500
require("./socket");
require("dotenv").config();

server.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});