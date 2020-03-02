const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const Planners = require('../planners/planner_model.js');
const secrets = require('../configs/secrets.js');

//creates a new user (wedding planner)
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Planners.add(user)
        .then(newUser => {
            const token = generateToken(newUser)
            res.status(201).json({ newUser, token})

        })
        .catch(err => {
            console.log('error creating a new user', err)
            res.status(500).json({ errorMessage: 'error creating a new wedding planner' })
        })
       
})

//logs in a current wedding planner
router.post('/login', (req, res) => {
    let {username, password} = req.body;

    Planners.findBy({ username })
        .then(planner => {
            if(planner && bcrypt.compareSync(password, planner.password)) {
                const token = generateToken(planner)
                res.status(201).json({ message: `Welcome Back ${planner.username}!`, token })
            } else {
                res.status(401).json({ message: 'Please provide valid credentials' })
            }
        })
        .catch(err => {
            console.log('error logging in', err)
            res.status(500).json({ errorMessage: 'Could not log in' })
        })
})

function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '2h'
    }
    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;