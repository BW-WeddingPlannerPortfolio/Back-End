const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h1>Welcome to Wedding Planner Portfolio, for documentation, please visit: </h1>')
});

module.exports = server;