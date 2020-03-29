const request = require('supertest');
const app = require('../../src/app');
const con = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await con.migrate.rollback();
        await con.migrate.latest();
    });
    afterAll(async () => {
        await con.destroy();
    })

    it('Should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "PET Care",
            email: "contato@petcare.org",
            whatsapp: "1911111111",
            city: "Limeira",
            uf: "SP"
        });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    });
});