const con = require('../database/connection');

module.exports = {
    async login(request, response){
        const { id } = request.body;

        const ong = await con('ongs').where('id', id).select('name').first();

        if (!ong){
            return response.status(400).json({error: "No ONG found whith this id!"});
        }
        
        return response.json(ong);
        
    }
}