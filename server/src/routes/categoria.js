const server = require('express').Router();
const { Sequelize } = require('sequelize');
const { Categoria } = require('../db.js');


//trae las categorias por cuit
server.get('/:cuit',(req,res,next)=>{
    let cuit = req.params.cuit
    Categoria.findAll({
      where:{userCuit:cuit}
    })
    .then(user=>{if(user){res.send(user)
    return}
    })})


//crear un usuario
server.post('/',async(req,res)=>{
 
  let {
      nombre,
      peso_min,
      peso_max,
      terminacion,
      userCuit
    } = req.body;
    console.log(req.body)

     //se crea la categoria
      Categoria.create({
        nombre,
        peso_min,
        peso_max,
        terminacion,
        userCuit
      })
      .then(cat=>{
          return res.status(201).send(cat);
      })
  // }
});

module.exports = server;