const con = require('../database/connection');

module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization;

        const inc = await con('incidents').where('ong_id', ong_id).select('*');

        return response.json(inc)
    }
}