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

async function getPlannerById(id) {
    const planner = await db('planners as p').where({ id }).select('p.id', 'p.username', 'p.profile_pic', 'p.home_location', 'p.email').first();

    const weddings = await db.from('weddings as w').where('w.planner_id', id)
    
    const profile = {
        planner,
        weddings: weddings
    }
    return profile;
}

function getPlanners() {
    return db('planners');
}

// function getPlannerById(id) {
//     return db('planners').where({ id })
// }