const db = require('../data/dbConfig.js');

module.exports = {
    getWeddings,
    getWeddingsById,
    getPlanners
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