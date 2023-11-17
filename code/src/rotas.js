const express = require('express');
const verificaLogin = require('./filtros/verificaLogin');
const { login } = require('./controladores/login');
const { novaPostagem, curtir, comentar, feed } = require('./controladores/postagens');
const { cadastrarUsuario, atualizarPerfil, obterPerfil } = require('./controladores/usuarios');

const rotas = express();


rotas.post('/usuarios', cadastrarUsuario);
rotas.post('/login', login);


rotas.use(verificaLogin);

rotas.get('/perfil', obterPerfil);
rotas.put('/perfil', atualizarPerfil);

//postagens

rotas.post('/postagens', novaPostagem);
rotas.get('/postagens', feed);
rotas.post('/postagens/:postagem_id/curtir', curtir);
rotas.post('/postagens/:postagem_id/comentar', comentar);

module.exports = rotas;