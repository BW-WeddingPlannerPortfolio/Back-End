const express = require('express');

const router = express.Router();

const Public = require('./public_model.js');

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