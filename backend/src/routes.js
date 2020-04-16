const express = require('express');

const UserController = require('./controllers/UserController');
const ReportController = require('./controllers/ReportController');
const ProfileController = require('./controllers/ProfileController');
const LoginController = require('./controllers/LoginController');

const routes = express.Router();

//Login dos usuários
routes.post('/loginAdmin', LoginController.loginAdmin);
routes.post('/loginUser', LoginController.loginUser);

//Listar todos os relatórios de um usuario especifico
routes.get('/profile', ProfileController.index);

//Cadastros de usuários
routes.post('/users', UserController.create);
//Listar  todos os usuários
routes.get('/users', UserController.index);
//Editar um usuário
routes.put('/users/:id', UserController.edit)

//Cadastro de relatórios
routes.post('/reports', ReportController.create);
//Listar todos os relatórios
routes.get('/reports', ReportController.index);
//Deletar um relatório
routes.delete('/reports/:id', ReportController.delete);
//Editar um relatório
routes.put('/reports/:id', ReportController.edit)
module.exports = routes;