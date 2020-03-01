const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const publicRouter = require('../public/public_router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api', publicRouter);

server.get('/', (req, res) => {
    res.send('<h1>Welcome to Wedding Planner Portfolio, for documentation, please visit: </h1>')
});

module.exports = server;