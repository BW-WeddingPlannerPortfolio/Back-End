const db = require('../data/dbConfig.js');

module.exports = {
    getPlannerById,
    add,
    findBy,
    editPlanner,
    getMyWeddings,
    getMyWeddingsById,
    addWedding,
    editWedding,
    deleteWedding
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



// function getPlannerById(id) {
//     return db('planners').where({ id })
// }


function add(user) {
    return db('planners').insert(user, 'id')
    .then(ids => {
        const [id] = ids;
        return getPlannerById(id)
    })
}

function findBy(filter) {
    return db('planners').where(filter).first();
}

function editPlanner(id, changes) {
    return db('planners').where('id', id).update(changes);
}

function getMyWeddings(id) {
    return db('weddings').where('weddings.planner_id', id);
}

function getMyWeddingsById(id) {
    return db('weddings').where('id', id);
}

function addWedding(info) {
    return db('weddings').insert(info, 'weddings.planner_id');
}

function editWedding(id, changes) {
    return db('weddings').where('id', id).update(changes);
}

function deleteWedding(id) {
    return db('weddings').where('id', id).del();
}