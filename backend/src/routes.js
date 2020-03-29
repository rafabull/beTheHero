const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

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

routes.post("/ongs", celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

routes.get("/incidents", celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),IncController.index);

routes.post("/incidents", celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
}), IncController.create);

routes.delete("/incidents/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),IncController.delete);

routes.get("/profile", celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProController.index);

module.exports = routes