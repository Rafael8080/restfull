// Importando express, serve principalmente pra criar servidor
const express = require('express');
// Importando consign, serve pra importar as rotas automaticamente
const consign = require('consign');
// Importando bodyParser, pois o express não tem modulo para interpretar metodo post
const bodyParser = require('body-parser');
//Auxilia na validação de dados
const expressValidator = require('express-validator');

let app = express();

// Independente da codificação que vier, ele Vai conseguir entender 
app.use(bodyParser.urlencoded({extended: false}));

// Convertendo os dados que vem via post em json
app.use(bodyParser.json());

//Auxiliar na validação de dados
app.use(expressValidator());

consign().include('routes').include('utils').into(app);

app.listen(3000, '127.0.0.1', () => {
    console.log('Servidor rodando');
});