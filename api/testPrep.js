const db = require('../data/dbConfig.js');

module.exports = () => {
    return db.migrate.rollback()
        .then(() => db.migrate.latest())
}