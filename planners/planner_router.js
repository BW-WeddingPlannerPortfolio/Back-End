const express = require('express');

const router = express.Router();

const Profile = require('./planner_model.js');
const db = require('../data/dbConfig.js');

// retrieves the logged in wedding planner
router.get('/:id', validateId, (req, res) => {
    const id = req.params.id;

    Profile.getPlannerById(id)
        .then(p => {
            // console.log(p)
            res.status(200).json(p)
        })
        .catch(err => {
            console.log('error getting this planner', err)
            res.status(500).json({ errorMessage: 'Could not find this wedding planner' })
        })
})

// edits the logged in wedding planner's profile information
router.put('/:id', validateProfileEdit, (req, res) => {
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
router.post('/weddings', validateNewWedding, (req, res) => {
    const wedding = req.body;

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
router.put('/weddings/:id', validateNewWedding, (req, res) => {
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
        .catch(err => {
            console.log('error deleting', err)
            res.status(500).json({ errorMessage: 'Wedding could not be deleted' })
        })
})

// validates new wedding fields and their character length
function validateNewWedding(req, res, next) {
    const input = req.body;

    if(!input) {
        res.status(400).json({ message: 'missing required fields' })
    } else if (input.wedding_name.length < 5) {
        res.status(400).json({ message: 'wedding name must be at least 5 characters' })
    } else if (input.theme.length < 3) {
        res.status(400).json({ message: 'theme must be at least 3 characters' })
    } else if (input.wedding_location.length < 2) {
        res.status(400).json({ message: 'location must be at least 2 characters' })
    } else if (input.description.length < 10) {
        res.status(400).json({ message: 'description must be at least 10 characters' })
    } else {
        next();
    }
}

// validates that the wedding exists in the database
function validateEditWedding(req, res, next) {
    const weddingId = req.params.id;

    db('weddings').where('id', weddingId)
        .then(wed => {
            if(wed.length === 0) {
                res.status(400).json({ message: 'unable to find this wedding to edit' })
            } else {
                next();
            }
        })
}

// validates that the profile 
function validateProfileEdit(req, res, next) {
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
        next();
        // db('planners').where('username', input.username)
        //     .then(user => {
        //         if(user.length === 0) {
        //             res.status(400).json({ message: 'cannot find this user' })
                    
        //         } else {
        //             next();
        //         }
        //     })
    }

}

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

module.exports = router;