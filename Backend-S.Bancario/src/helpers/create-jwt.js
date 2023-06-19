'use strict'
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET_KEY;

const generateJWT = async (uId, username, email) => {
    const payload = {uId, username, email};
    try{

    }catch(err){
        throw new Error(err + 'No se puedo generar el token');
    }
}
module.exports = {
    generateJWT
};