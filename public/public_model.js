const db = require('../data/dbConfig.js');

module.exports = {
    getWeddings,
    getPlanners
}

function getWeddings() {
    return db('weddings');
}

function getPlanners() {
    return db('planners');
}