const environment = process.env.ENVIRONMENT || 'development'
// const config = require('../knexfile.js')[environment];
// module.exports = require('knex')(config);

const connection = require('../knexfile.js')[environment]
const database = require('knex')(connection)

module.exports = {
    getAllUser() {
        return database('users').select()
    },
    getUserPass(username) {
        return database('users').where('username', username).select().first()
    },

    getUserInfo(username) {
        return database('users').where('username', username).select('iduser', 'username').first()
    },
    insertUser(newUser) {
        return database
            .insert(newUser)
            .into("users")
            .returning("*")
            .then(rows => {
                return rows[0];
            });
    }
}