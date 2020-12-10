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
    let cuit = req.params.cuit
    let operaciones=[]
    let clienteId=""
    let consigId=""

    await Operacion.findAll({
      where:{userCuit:cuit}
    })
    .then(ops=>{
      ops.map(item=>{
        operaciones.push(item.dataValues)
      })
    })

    for (let i = 0; i<operaciones.length;i++){
      let opsId=""+operaciones[i].id
      clienteId=0
      consigId=0
      operaciones[i].guias=[]
      operaciones[i].factura_cliente=[]
      operaciones[i].cliente=[]
      operaciones[i].factura_consig=[]
      operaciones[i].consig=[]
      operaciones[i].factura_transporte=[]
      operaciones[i].transporte=[]
      await Guia.findAll({
        where:{operacionId:opsId}
      })
      .then(items=>{
        items.map(g=>{
          operaciones[i].guias.push(g.dataValues)
        })
      })
      await Factura_Cliente.findAll({
        where:{operacionId:operaciones[i].id}
      })
      .then(cliente=>{
        cliente.map(item=>{
          operaciones[i].factura_cliente.push(item.dataValues)
          clienteId=item.dataValues.clienteExternoId
        })
      })
      await Cliente_externo.findAll({
        where:{id:clienteId}
      })
      .then(cliente=>{
        cliente.map(item=>{
          operaciones[i].cliente.push(item.dataValues)
        })
      })
      await Factura_Consig.findAll({
        where:{operacionId:operaciones[i].id}
      })
      .then(consig=>{
        consig.map(item=>{
          operaciones[i].factura_consig.push(item.dataValues)
          consigId=item.dataValues.consignatarioId
        })
      })
      await Consignatario.findAll({
        where:{id:consigId}
      })
      .then(consig=>{
        consig.map(item=>{
          operaciones[i].consig.push(item.dataValues)
        })
      })
     for (let j = 0;j<operaciones[i].guias.length;j++){
       let guiaId = ""+operaciones[i].guias[j].id
       transporteId=""
       await Factura_Transporte.findAll({
         where:{guiaId:guiaId}
       })
       .then(transporte=>{
         transporte.map(item=>{
          operaciones[i].factura_transporte.push(item.dataValues)
         })
       })
     }
     for(let j=0;j<operaciones[i].factura_transporte.length;j++){
      await Transporte.findAll({
        where:{cuit:operaciones[i].factura_transporte[j].cuiTransporte}
      })
      .then(transporte=>{
        transporte.map(item=>{
         operaciones[i].transporte.push(item.dataValues)
        })
      })
     }
    } 

    res.send(operaciones)
  
  })


//crear una operacion
server.post('/',async(req,res)=>{
 //----------DATA INLET----------------------- 
 let {
    data,
    cliente_externo,
    consignatario,
    factura_cliente,
    factura_consig,
    guias
    } = req.body;
    //-----------AUX VARIABLES--------------------------

    let operacionId=''
    let guiaId=''
    let facturaTransporteId=''
    let vehiculoId=''
    let clienteId=''
    let consigId=''
    console.log(guias[0].animales)

    //------------SEQUELIZE-----------------------------

     //se crea la categoria
     await Operacion.create({
          tipo:data.tipo,
          estado:data.estado,
          cant_animales:data.cant_animales,
          userCuit:data.userCuit
      })
      .then(ops=>{
          
          operacionId=ops.id
          console.log('ops id='+operacionId)
      })
      .catch(err=>{
        console.log("error en operacion")
      })

      await Cliente_externo.create({
          cuit:cliente_externo.cuit,
          razon_social:cliente_externo.razon_social,
          direccion_fiscal:cliente_externo.direccion_fiscal,
          cp:cliente_externo.cp,
          telefono:cliente_externo.telefono,
          email:cliente_externo.email,
          operacionId:operacionId,
          userID:data.userCuit
      })
      .then(cliente=>{        
        clienteId=cliente.id
        console.log('cliente id='+clienteId)
      })
      .catch(err=>{
        console.log("error en cliente")
      })

      await Cliente_Operacion.create({
        clienteId:clienteId,
        operacionId:operacionId
      })
      .catch(err=>{
        console.log("error en cliente_operacion")
      })


      if(consignatario.cuit){
          await Consignatario.create({
          cuit:consignatario.cuit,
          razon_social:consignatario.razon_social,
          direccion_fiscal:consignatario.direccion_fiscal,
          cp:consignatario.cp,
          telefono:consignatario.telefono,
          email:consignatario.email
      })
      .then(consig=>{
       
        consigId=consig.id
        console.log('consig id='+consigId)
    })
    .catch(err=>{
      console.log("error en consignatario")
    })

    await Consig_Operacion.create({
      consigId:consigId,
      operacionId:operacionId
    })
    .catch(err=>{
      console.log("error en consignatario_Ops")
    })

    }
      await Factura_Cliente.create({
          numero:factura_cliente.numero,
          total:factura_cliente.total,
          fecha:factura_cliente.fecha,
          clienteExternoId:clienteId,
          operacionId:operacionId
      })
      .catch(err=>{
        console.log("error en factura_Cliente")
      })

      console.log('Consologeando FACTURA CONSIG' + factura_consig)
      if (factura_consig.numero){
        await Factura_Consig.create({
            numero:factura_consig.numero,
            total:factura_consig.total,
            fecha:factura_consig.fecha,
            consignatarioId:consigId,
            operacionId:operacionId
        })
        .catch(err=>{
          console.log("error en factura_Consig")
        })
        
      }

      for (let i =0;i<guias.length;i++){
        await Guia.create({
          numero:guias[i].guia,
          lugar_pesaje:guias[i].pesajePlace,
          ticket_balanza:guias[i].ticket,
          peso_neto:guias[i].peso,
          cantAnimales:guias[i].cantAnimales,
          operacionId:operacionId
        })
        .then(guia=>{
          guiaId=guia.id
        })
        .catch(err=>{
          console.log("error en guia")
        })

        await Transporte.create({
          cuit:guias[i].transporte.cuiTransportista,
          razon_social:guias[i].transporte.transportista
        })
        .catch(err=>{
          console.log("error en transporte")
        })

        await Factura_Transporte.create({
          numero:guias[i].facturaTransporte.numFactura,
          total:guias[i].facturaTransporte.totalFactura,
          guiaId:guiaId,
          cuiTransporte:guias[i].transporte.cuiTransportista
        })
        .then(factura=>{
          facturaTransporteId=factura.id
          console.log(facturaTransporteId)
        })
        .catch(err=>{
          console.log("error en factura_transporte")
        })
        await Vehiculo.create({
          chasis:guias[i].transporte.chasis,
          acoplado:guias[i].transporte.acoplado,
        })
        .then(vehiculo=>{
          vehiculoId=vehiculo.id
          console.log(vehiculoId)
        })
        .catch(err=>{
          console.log("error en vehiculo")
        })
        await Chofer.create({
          cuil:guias[i].transporte.cuil,
          nombre:guias[i].transporte.chofer,
        })
        .catch(err=>{
          console.log("error en chofer")
        })
        await Guia_Transporte.create({
          guiaId:guiaId,
          cuiTransporte:guias[i].transporte.cuiTransportista,
          cuilChofer:guias[i].transporte.cuil,
          idVehiculo:vehiculoId
        })
        .catch(err=>{
          console.log("error en guia_transporte")
        })

        for (let j = 0;j<guias[i].animales.length;j++){
          if(guias[i].animales[j].guia===guias[i].guia){
            await Caravana.create({
              caravana:guias[i].animales[j].caravana,
              raza:guias[i].animales[j].raza,
              sexo:guias[i].animales[j].sexo,
              frame:guias[i].animales[j].frame,
              fecha_ingreso:guias[i].animales[j].fechaIngreso,
              peso_inicio:guias[i].animales[j].pesoInicial,
              peso_actual:guias[i].animales[j].pesoInicial,
              fecha_pesaje:guias[i].animales[j].fechaIngreso,
              estado:guias[i].animales[j].estado,
              establecimientoId:guias[i].animales[j].establecimientoId,
              rodeoId:guias[i].animales[j].rodeoId
            })
            .catch(err=>{
              console.log("error en caravana")
            })
            await Guia_Caravana.create({
              guiaId:guiaId,
              caravana:guias[i].animales[j].caravana
            })
            .catch(err=>{
              console.log("error en guia_caravana")
            })
          }
        }
      }


      res.send("Done")
});

module.exports = server;