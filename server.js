require('dotenv').config();

const http = require('http');
const app = require('./app')
const server = http.createServer(app);
const port = process.env.PORT || 9000;
const NODE_ENV = process.env.NODE_ENV;

server.listen(port, () => {
  console.log(`server running on port ${port} in ${NODE_ENV} mode`)
});

