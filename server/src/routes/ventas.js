const server = require('express').Router();
const { Sequelize } = require('sequelize');
const {Operacion,Cliente_externo,Consignatario,Factura_Cliente,Factura_Consig,
    Guia,Transporte,Chofer,Vehiculo,Factura_Transporte,Rodeo,Caravana,
    Guia_Transporte,Guia_Caravana,Consig_Operacion,Cliente_Operacion} = require('../db.js');
const { Model } = require('sequelize');
const { STRING } = require('sequelize');
const { where } = require('sequelize');


//trae las ordenes por cuit
server.get('/history/:cuit',async (req,res,next)=>{
  
  })


//crear una operacion
server.post('/',async(req,res)=>{
    
  //----------DATA INLET----------------------- 
    let {
      data,
      cliente_externo,
      consignatario,
      animales
      } = req.body;

      console.log(animales[0])
      

  //-----------AUX VARIABLES--------------------------
    let operacionId=''
    let clienteId=''
    let consigId=''
  //------------SEQUELIZE-----------------------------
    //se graban los datos de la operacion
  //   await Operacion.create({
  //     tipo:'venta',
  //     estado:data.estado,
  //     cant_animales:data.cant_animales,
  //     userCuit:data.userCuit
  //   })
  //   .then(ops=>{
        
  //       operacionId=ops.id
  //       console.log('ops id='+operacionId)
  //   })
  //   .catch(err=>{
  //     console.log("error en operacion")
  //   })

  //   await Cliente_externo.create({
  //     cuit:cliente_externo.cuit,
  //     razon_social:cliente_externo.razon_social,
  //     direccion_fiscal:cliente_externo.direccion_fiscal,
  //     cp:cliente_externo.cp,
  //     telefono:cliente_externo.telefono,
  //     email:cliente_externo.email,
  //     operacionId:operacionId,
  //     // userID:data.userCuit
  // })
  // .then(cliente=>{        
  //   clienteId=cliente.id
  //   console.log('cliente id='+clienteId)
  // })
  // .catch(err=>{
  //   console.log("error en cliente")
  // })      

  // await Cliente_Operacion.create({
  //   clienteId:clienteId,
  //   operacionId:operacionId
  // })
  // .catch(err=>{
  //   console.log("error en cliente_operacion")
  // })

  // if(consignatario.cuit){
  //     await Consignatario.create({
  //     cuit:consignatario.cuit,
  //     razon_social:consignatario.razon_social,
  //     direccion_fiscal:consignatario.direccion_fiscal,
  //     cp:consignatario.cp,
  //     telefono:consignatario.telefono,
  //     email:consignatario.email
  //   })
  //   .then(consig=>{

  //   consigId=consig.id
  //   console.log('consig id='+consigId)
  //   })
  //   .catch(err=>{
  //   console.log("error en consignatario")
  //   })

  //   await Consig_Operacion.create({
  //   consigId:consigId,
  //   operacionId:operacionId
  //   })
  //   .catch(err=>{
  //   console.log("error en consignatario_Ops")
  //   })
  // }

  for (let i = 0;i<animales.length;i++){
    
    Caravana.findByPk(animales[i])
    .then(animal=>{
      animal.estado=data.tipo
      animal.save()
    })
    .catch(err=>{
      console.log("error en Caravana")
    })

  }

  res.send("Done")
});

module.exports = server;

