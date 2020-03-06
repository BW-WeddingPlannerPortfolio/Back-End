const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const Planners = require('../planners/planner_model.js');
const secrets = require('../configs/secrets.js');
const db = require('../data/dbConfig.js');
//creates a new user (wedding planner)
router.post('/register', validateSignup, validateEmail, (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Planners.add(user)
        .then(newUser => {
            const token = generateToken(newUser)
            // console.log(newUser)
            res.status(201).json({ message: `Welcome ${newUser.planner.username}!`, newUser, token})

        })
        .catch(err => {
            console.log('error creating a new user', err)
            res.status(500).json({ errorMessage: 'error creating a new wedding planner' })
        })
       
})

//logs in a current wedding planner
router.post('/login', validateLogin, (req, res) => {
    let {username, password} = req.body;

    Planners.findBy({ username })
        .then(planner => {
            if(planner && bcrypt.compareSync(password, planner.password)) {
                const token = generateToken(planner)
                res.status(201).json({ message: `Welcome Back ${planner.username}!`, planner, token })
            } else {
                res.status(401).json({ message: 'Please provide valid credentials' })
            }
        })
        .catch(err => {
            console.log('error logging in', err)
            res.status(500).json({ errorMessage: 'Could not log in' })
        })
})

// validates login fields and their character length
function validateLogin(req, res, next) {
    const input = req.body;

    if (!input) {
        res.status(400).json({ message: 'missing required fields' })
    } else if (input.username.length === 0) {
        res.status(400).json({ message: 'username is a required field' })
    } else if (input.password.length === 0) {
        res.status(400).json({ message: 'password is a required field' })
    } else {
        next();
    }
}

// validates signup fields and their character length
function validateSignup(req, res, next) {
    const input = req.body;

    if(!input) {
        res.status(400).json({ message: 'missing required fields' })
    } else if (input.username.length < 5) {
        res.status(400).json({ message: 'username must be at least 5 characters' })
    } else if (input.password.length < 5) {
        res.status(400).json({ message: 'password must be at least 5 characters' })
    } else if (input.home_location.length < 2) {
        res.status(400).json({ message: 'your location must be at least 2 characters' })
    } else if (input.email.length < 5) {
        res.status(400).json({ message: 'your email must be at least 5 characters long' })
    } else {
        db('planners').where('username', input.username)
            .then(user => {
                if(user.length === 0) {
                    next();
                } else {
                    res.status(400).json({ message: 'username already exists' })
                }
            })
    }

}

// validates that an email is unique
function validateEmail(req, res, next) {
    const input = req.body;

    db('planners').where('email', input.email)
        .then(mail => {
            if(mail.length === 0) {
                next();
            } else {
                res.status(400).json({ message: 'email already exists' })
            }
        })
}


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