const server = require('express').Router();
const { Sequelize } = require('sequelize');
const { Rodeo, Caravana} = require('../db.js');


//trae los rodeos de un establecimiento
server.get('/:establecimientoId',(req,res,next)=>{
    let establecimientoId = req.params.establecimientoId
    Rodeo.findAll({
      where:{establecimientoId:establecimientoId}
    })
    .then(user=>{if(user){res.send(user)
    return}
    })})

    //trae las caravanas de un rodeo 
server.get('/caravanas/:rodeoId',(req,res,next)=>{
  let rodeoId = req.params.rodeoId
  Caravana.findAll({
    where:{rodeoId:rodeoId}
  })
  .then(user=>{if(user){res.send(user)
  return}
  })})

      //edita peso promedio de las caravanas de un rodeo 
  server.put('/caravanas/peso_promedio/:rodeoId',async (req,res,next)=>{
  let rodeoId = req.params.rodeoId
  let data = req.body
  let caravanas=[]
  console.log(data)
  await Caravana.findAll({
  where:{rodeoId:rodeoId}
  })
  .then(caravana=>{
    caravana.map(item =>{
      caravanas.push(item.dataValues)
    })
  })
  caravanas.map(async item =>{
    await Caravana.findByPk(item.caravana)
    .then(animal=>{
      animal.peso_actual=data.nuevoPromedio
      animal.fecha_pesaje=data.fechaPesaje
      animal.save()
    })
  })
  res.sendStatus
})

     //edita peso de cada caravana de un rodeo 
  server.put('/caravanas/:caravanaID',(req,res,next)=>{
    let caravana = req.params.caravanaID
    let data = req.body
    Caravana.findByPk(caravana)
    .then(animal=>{
      animal.peso_actual=data.pesoCaravana
      animal.fecha_pesaje=data.fechaPesaje
      animal.save()
      res.sendStatus(200)
    })
    .catch(err=>{
      res.sendStatus(400)
    })

  })

   //edita rodeo al que pertenecen un grupo de animales 
  server.put('/caravanas/move_to/:rodeoId',async (req,res,next)=>{
    let rodeoId = req.params.rodeoId
    let data = req.body
    let caravanas=[]
    console.log(data)
    await Caravana.findAll({
    where:{rodeoId:rodeoId}
    })
    .then(caravana=>{
      caravana.map(item =>{
        caravanas.push(item.dataValues)
      })
    })
    console.log(caravanas[0])
    console.log(data)
    caravanas.map(async item =>{
    await Caravana.findByPk(item.caravana)
       .then(animal=>{
         animal.establecimientoId=data.nuevoEstablecimiento
         animal.rodeoId=data.nuevoRodeo
         animal.save()
       })
     })
    res.sendStatus(200)
  })

     //edita peso de cada caravana de un rodeo 
  server.put('/move/caravanas/:caravanaID',(req,res,next)=>{
    let caravana = req.params.caravanaID
    let data = req.body
    Caravana.findByPk(caravana)
    .then(animal=>{
      animal.establecimientoId=data.nuevoEstablecimiento
      animal.rodeoId=data.nuevoRodeo
      animal.save()
      res.sendStatus(200)
    })
    .catch(err=>{
      res.sendStatus(400)
    })

  })  
  

//crear un rodeo
server.post('/:establecimientoId',async(req,res)=>{
    let establecimientoId = req.params.establecimientoId
    console.log(establecimientoId)
    console.log(req.body)
 

});

module.exports = server;