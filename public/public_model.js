const db = require('../data/dbConfig.js');

module.exports = {
    getWeddings,
    getWeddingsById,
    getPlanners, 
    getPlannerById
}

function getWeddings() {
    return db('weddings');
}

function getWeddingsById(id) {
    return db('weddings').where({ id })
}

function getPlanners() {
    return db('planners');
}

function getPlannerById(id) {
    return db('planners').where({ id })
}