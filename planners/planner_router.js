const express = require('express');

const router = express.Router();

const Profile = require('./planner_model.js');

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

module.exports = router;