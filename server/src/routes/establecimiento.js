const server = require('express').Router();
const { Sequelize } = require('sequelize');
const { Establecimiento,Rodeo,Categoria} = require('../db.js');
const { Model } = require('sequelize');


//trae los establecimientos por cuit
server.get('/:cuit',async (req,res,next)=>{
    let cuit = req.params.cuit
    let data ={establecimientos:[],rodeos:[],categoria:[]}
    await Establecimiento.findAll({
      where:{userCuit:cuit},
    })
    .then(stab=>{if(stab){
      data.establecimientos=stab
      }
    })
    await Rodeo.findAll({
      where:{userCuit:cuit}
    })
    .then(rodeo=>{
      data.rodeos=rodeo
    })
    await Categoria.findAll({
      where:{userCuit:cuit}
    })
    .then(cat=>{
      data.categoria=cat
    })
    res.send(data)
  
  })


//crear un usuario
server.post('/',async(req,res)=>{
 
  let {
    nombre_establecimiento,
    establecimiento_cp,
    userCuit,
    rodeoArray
    } = req.body;
    console.log(rodeoArray)

     //se crea la categoria
      Establecimiento.create({
        nombre:nombre_establecimiento,
        cp:establecimiento_cp,
        userCuit:userCuit
      })
      .then(estab=>{
          rodeoArray.map(item=>{
            Rodeo.create({
              nombre:item.nombre,
              establecimientoId:estab.id,
              categoriumId:item.categoria,
              userCuit:userCuit
            })
          })
          return res.status(201).send("Establecimiento "+ nombre_establecimiento +" Guardado");
      })
  // }
});

module.exports = server;