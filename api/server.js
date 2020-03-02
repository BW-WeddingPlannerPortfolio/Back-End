const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const publicRouter = require('../public/public_router.js');
const privateRouter = require('../planners/planner_router.js');
const authRouter = require('../auth/auth_router.js');
const authentication = require('../auth/auth_middleware.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api', publicRouter);
server.use('/api/private', authentication, privateRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.send('<h1>Welcome to Wedding Planner Portfolio, for documentation, please visit: </h1>')
});

module.exports = server;