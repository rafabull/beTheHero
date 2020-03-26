const con = require('../database/connection')

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;
        const inc = await con('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')
        .limit(5).offset((page - 1) * 5)
        .select(['incidents.*',
                'ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf'
                ]);
    
        const [count] = await con('incidents').count();

        response.header('X-Total-Count', count['count(*)']);
        return response.json(inc);
    },

    async create (request, response){
        const ong_id = request.headers.authorization;
        const {title, description, value} = request.body;
        
        const [id] = await con('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await con('incidents').where('id', id).select('ong_id').first();

        if (incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not permitted'});
        }

        await con('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}