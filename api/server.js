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
server.use(logger);

// all endpoints that are publically accessable 
server.use('/api', publicRouter);

// all endpoints that are protected by authentication, only meant for logged in wedding planners
server.use('/api/planner', authentication, privateRouter);

// endpoints for logging-in and registering wedding planners
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.send('<h1>Welcome to Wedding Planner Portfolio, for documentation, please visit: https://github.com/BW-WeddingPlannerPortfolio/Back-End </h1>')
});

// logs a method run and where it came from
function logger (req, res, next) {
    const {method, originalUrl} = req;
    console.log(`${method} to ${originalUrl}`);
    next();
}

module.exports = server;

