const express = require('express');

const router = express.Router();

const Public = require('./public_model.js');
const db = require('../data/dbConfig.js');

// returns an array of all weddings
router.get('/weddings', (req, res) => {
    Public.getWeddings()
        .then(weddings => {
            res.status(200).json(weddings)
        })
        .catch(err => {
            console.log('error getting list of weddings', err)
            res.status(500).json({ errorMessage: 'Could not get a list of weddings' })
        })
})

// returns a single wedding object according to its id
router.get('/weddings/:id', validateWeddingId, (req, res) => {
    const id = req.params.id;

    Public.getWeddingsById(id)
        .then(wedding => {
            res.status(200).json(wedding)
        })
        .catch(err => {
            console.log('error getting wedding by id', err)
            res.status(500).json({ errorMessage: 'Could not find this wedding' })
        })
})


// returns an array of all wedding planners
router.get('/planners', (req, res) => {
    Public.getPlanners()
        .then(planners => {
            res.status(200).json(planners)
        })
        .catch(err => {
            console.log('error getting list of planners', err)
            res.status(500).json({ errorMessage: 'Could not get a list of Wedding Planners' })
        })
})

// returns a single planner object according to its id
router.get('/planners/:id', validateId, (req, res) => {
    const id = req.params.id;

    Public.getPlannerById(id)
        .then(planner => {
            console.log(planner)
            res.status(200).json(planner)
        })
        .catch(err => {
            console.log('error getting planner by id', err)
            res.status(500).json({ errorMessage: 'Could not get find this wedding planner' })
        })
})

// checks to see if this id exists
function validateId(req, res, next) {
    const id = req.params.id;

    if(!id) {
        res.status(400).json({ message: 'planner id not provided' })
    } else {
        db('planners').where('id', id)
            .then(planner => {
                if(planner.length === 0) {
                    res.status(400).json({ message: 'planner does not exist' })
                } else {
                    next();
                }
            })
    }
}

function validateWeddingId(req, res, next) {
    const id = req.params.id;

    if(!id) {
        res.status(400).json({ message: 'planner id not provided' })
    } else {
        db('weddings').where('id', id)
            .then(wedding => {
                if(wedding.length === 0) {
                    res.status(400).json({ message: 'wedding does not exist' })
                } else {
                    next();
                }
            })
    }
}

module.exports = router;