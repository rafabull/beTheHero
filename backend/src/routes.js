const express = require('express');
const crypto = require('crypto');

const con = require('./database/connection')
const routes = express.Router();

const OngController = require('./controllers/ongController')
const IncController = require('./controllers/incidentsController')
const ProController = require('./controllers/profileController')
const SesController = require('./controllers/sessionController')

routes.get("/creator", (request, response)=>{
    return response.json({
        msg: "Hello World!",
        aluna:"Rafaela Bull"
    });
});

routes.post('/sessions', SesController.login);

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

routes.get("/incidents", IncController.index);
routes.post("/incidents", IncController.create);
routes.delete("/incidents/:id", IncController.delete);

routes.get("/profile", ProController.index);

module.exports = routes