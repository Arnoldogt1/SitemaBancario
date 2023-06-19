'use strict'
 const Users = require ('../models/user.models');
 const bcrypt = require ('bcrypt');

 const createUser = async(req, res) => {
    const {email, password} = req.body;
    try{
        let user = await Users.findOne({email});
        if(user){
            return res.status(400).send({
                msg: 'Ya existe alguien con este correo',
                ok: false,
                user: user,
            });
        }

        user = new Users(req.body);

        const saltos = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, saltos);

        user = await user.save();
        res.status(200).send({
            msg: 'Usuario creado correctamente',
            ok: true, 
            user: user,
        })
    }catch (error){
        console.log(error);
    }
 };

 const listUser = async (req, res) => {
    try {
        const user = await Users.find();
        if(user.length == 0) return res.status(404).send({msg: 'No se encontro usuarios'});
        return res.status(200).json({'Usuarios encontrados': user});

    }catch (err){
        console.log(err);
            res.status(500).send({msg:'Ocurrio un error'})
    }
 };

 const editUser = async(req, res) => {
    try{
        const id = req.params.id;
        const edituser = {...req.body};
        edituser.password = edituser.password
        ? bcrypt.hashSync(edituser.password, bcrypt.genSaltSync())
        : edituser.password;

        const userComplete = await Users.findByIdAndUpdate(id, edituser, {new: true,});

        if(userComplete){
            return res.status(200).send({
                msg: 'Se actualizarón correctamente los datos', userComplete
            });
        }else{
            res.status(404).send({
                msg: 'Este usuario no existe en la base de datos'
            });
        }
    }catch (err){
        console.log(err);
    }
 };

 const deleteUser = async(req, res) => {
    try{
        const id = req.params.id;
        const userD = await Users.findByIdAndDelete(id);
            return res.status(500).send({msg: `usuario eliminado correctamente`, userD});
    }catch(err){
        console.log(err);
    }
 };


 module.exports = {
    createUser,
    listUser,
    editUser,
    deleteUser,
 };