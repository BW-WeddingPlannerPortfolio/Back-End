const express = require('express');

const router = express.Router();

const Profile = require('./planner_model.js');

// retrieves the logged in wedding planner
router.get('/:id', (req, res) => {
    const id = req.params.id;

    Profile.getPlannerById(id)
        .then(p => {
            res.status(200).json(p)
        })
        .catch(err => {
            console.log('error getting this planner', err)
            res.status(500).json({ errorMessage: 'Could not find this wedding planner' })
        })
})

// edits the logged in wedding planner's profile information
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let updatedPlanner = req.body;

    Profile.editPlanner(id, updatedPlanner)
        .then(newInfo => {
            console.log(newInfo)
            res.status(200).json({ message: 'Profile successfully updated!' })
        })
        .catch(err => {
            console.log('error updating this profile', err)
            res.status(500).json({ errorMessage: 'This profile could not be modified' })
        })
})

// retrieves a list of weddings for logged in wedding planner
router.get('/:id/weddings', (req, res) => {
    const id = req.params.id;
    Profile.getMyWeddings(id)
        .then(weddings => {
            res.status(200).json(weddings)
        })
        .catch(err => {
            console.log('error getting wedding by id', err)
            res.status(500).json({ errorMessage: 'Could not find this wedding' })
        })
})

// retrieves specified wedding (by id) for logged in wedding planner
router.get('/weddings/:id', (req, res) => {
    const id = req.params.id;
    Profile.getMyWeddingsById(id)
        .then(wedding => {
            res.status(200).json(wedding)
        })
        .catch(err => {
            console.log('error getting wedding by id', err)
            res.status(500).json({ errorMessage: 'Could not find this wedding' })
        })
})

// creates a new wedding for logged in wedding planner
router.post('/weddings', (req, res) => {
    const wedding = {...req.body}

    Profile.addWedding(wedding)
        .then(wed => {
            res.status(201).json(wed)
        })
        .catch(err => {
            console.log('error creating a new wedding', err)
            res.status(500).json({ errorMessage: 'Wedding could not be created' })
        })
})

// edits a wedding (by id) for logged in wedding planner 
router.put('/weddings/:id', (req, res) => {
    const id = req.params.id;
    const updateWedding = req.body;

    Profile.editWedding(id, updateWedding)
        .then(updatedWedding => {
            res.status(200).json({ message: 'Wedding has been successfully updated' })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'This wedding could not be modified' })
        })
})

// deletes a wedding (by id) for logged in wedding planner
router.delete('/weddings/:id', (req, res) => {
    const id = req.params.id;
    
    Profile.deleteWedding(id)
        .then(deleted => {
            res.status(200).json({ message: 'Wedding has successfully been deleted' })
        })
})

module.exports = router;