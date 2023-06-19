'use strict'

const {Router} = require('express');
const { createUser, listUser, editUser, deleteUser } = require('../controllers/user.controller');

const api = Router();

api.post('/create-user', createUser);

api.get('/list-user', listUser);

api.put('/edit-user/:id', editUser);

api.delete('/delete-user/:id', deleteUser);

module.exports  = api; 