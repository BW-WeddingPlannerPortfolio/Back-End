const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const Planners = require('../planners/planner_model.js');
const secrets = require('../configs/secrets.js');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Planners.add(user)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            console.log('error creating a new user', err)
            res.status(500).json({ errorMessage: 'error creating a new wedding planner' })
        })
})

module.exports = router;