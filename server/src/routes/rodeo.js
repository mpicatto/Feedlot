const server = require('express').Router();
const { Sequelize } = require('sequelize');
const { Rodeo} = require('../db.js');


//trae los rodeos de un establecimiento
server.get('/:establecimientoId',(req,res,next)=>{
    let establecimientoId = req.params.establecimientoId
    Rodeo.findAll({
      where:{establecimientoId:establecimientoId}
    })
    .then(user=>{if(user){res.send(user)
    return}
    })})


//crear un rodeo
server.post('/:establecimientoId',async(req,res)=>{
    let establecimientoId = req.params.establecimientoId
    console.log(establecimientoId)
    console.log(req.body)
 
//   let {
//     nombre_establecimiento,
//     establecimiento_cp,
//     userCuit
//     } = req.body;
//     console.log(req.body)

//      //se crea la categoria
//       Establecimiento.create({
//         nombre:nombre_establecimiento,
//         cp:establecimiento_cp,
//         userCuit:userCuit
    //   })
    //   .then(estab=>{
    //       return res.status(201).send(estab);
    //   })
  // }
});

module.exports = server;