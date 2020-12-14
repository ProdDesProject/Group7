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
    },

    getAllHour() {
        return database('hours').select()
    },

    getMin(min) {
        return database('hours').where('min',min).select('idhour','min').first()
    },

    getAllRobot() {
        return database('robots').select()
    },

    getRobot(name) {
        return database('robots').where('name',name).select('idrobot','name').first()
    },

    insertRobot(newRobot) {
        return database('robots').insert(newRobot, '*')
    },

    deleteRobot(idrobot) {
        return database('idrobot').where('idrobot',idrobot).del()
    },

    getAllReservation() {
        return database('reservation').select('*').innerJoin('robots', 'reservation.idrobot', 'robots.idrobot')
    },

    getReservationById(idres) {
        return database('reservation').where('idres',idres).select('idres','idrobot','iduser','idhour','date').first()
    },

    getReservationByDate(dayVariable) {
        return database('reservation').where('date',dayVariable)
        //andWhereRaw('EXTRACT(DAY FROM date::date) = ?',[dayVaribale])
    },
    
    getReservationByName(username) {
       return database('reservation').select(['reservation.idres','reservation.idhour','reservation.idrobot','reservation.iduser','reservation.date',
                        'users.username','name']).innerJoin('users','users.iduser','reservation.iduser').where('username',username).innerJoin('robots', 'reservation.idrobot', 'robots.idrobot')
    },

    deleteReservation(idres) {
        return database('reservation').where('idres',idres).del()
    },

    insertReservation(newRes) {
        return database('reservation').insert(newRes, '*')
    }

}