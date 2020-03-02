const express = require('express');

const router = express.Router();

const Private = require('./planner_model.js');

router.get('/planner/:id', (req, res) => {
    const id = req.params.id;

    Private.getPlannerById(id)
        .then(p => {
            res.status(200).json(p)
        })
        .catch(err => {
            console.log('error getting this planner', err)
            res.status(500).json({ errorMessage: 'Could not find this wedding planner' })
        })
})

module.exports = router;