const db = require('../data/dbConfig.js');

module.exports = {
    getPlannerById,
    add,
    findBy
}

function getPlannerById(id) {
    return db('planners').where({ id })
}

function add(user) {
    return db('planners').insert(user, 'id')
    .then(ids => {
        const [id] = ids;
        return getPlannerById(id).first();
    })
}

function findBy(filter) {
    return db('planners').where(filter).first();
}