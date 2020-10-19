const server = require('express').Router();
const { Sequelize } = require('sequelize');
const  { bcrypt, hash } = require( 'bcryptjs');
const { User, } = require('../db.js');


//trae los usuarios por cuit
server.get('/:cuit',(req,res,next)=>{
    let cuit = req.params.cuit
    User.findAll({
      where:{cuit:cuit}
    })
    .then(user=>{if(user){res.send(user)
    return}
    })})


//crear un usuario
server.post('/',async(req,res)=>{
 
  let {
    cuit,
    razon_social,
    email,
    password,
    nombre,
    apellido,
    calle,
    numero,
    departamento,
    localidad,
    provincia,
    cp,
    telefono1,
    telefono2} = req.body;


  password = await hash(password,10);
     //se crea el usuario
      User.create({
        cuit,
        razon_social,
        email,
        password,
        nombre,
        apellido,
        calle,
        numero,
        departamento,
        localidad,
        provincia,
        cp,
        telefono1,
        telefono2
      })
      .then(user=>{
          return res.status(201).send(user);
      })
  // }
});

module.exports = server;