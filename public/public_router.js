const express = require('express');

const router = express.Router();

const Public = require('./public_model.js');

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
router.get('/weddings/:id', (req, res) => {
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

module.exports = router;