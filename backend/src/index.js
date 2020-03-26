/**
Acesso aos rote params (parametros nao nomeados)
  app.get("/users/:id", (request, response)=>{
    const params = request.params; 
  });
Acesso query params (parametros nomeados, separado por ?)
  app.get("/users", (request, response)=>{
    const params = request.query; 
  });

  app.use(cors(
    origin: 'http://enderecoDeOrigem.com'
  ));
 
 */
const cors = require('cors');
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3333);

