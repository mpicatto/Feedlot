const server = require('express').Router();
const { Sequelize } = require('sequelize');
const {Operacion,Cliente_externo,Consignatario,Factura_Cliente,Factura_Consig,
    Guia,Transporte,Chofer,Vehiculo,Factura_Transporte,Rodeo,Caravana,
    Guia_Transporte,Guia_Caravana,Consig_Operacion,Cliente_Operacion} = require('../db.js');
const { Model } = require('sequelize');
const { STRING } = require('sequelize');


//trae las ordenes por cuit
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


//crear una operacion
server.post('/',async(req,res)=>{
 
  let {
    data,
    cliente_externo,
    consignatario,
    factura_cliente,
    factura_consig,
    guias
    } = req.body;
    let operacionId=''
    let guiaId=''
    let facturaTransporteId=''
    let vehiculoId=''
    let clienteId=''
    let consigId=''
    console.log(guias[0].animales)
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

      await Cliente_externo.create({
          cuit:cliente_externo.cuit,
          razon_social:cliente_externo.razon_social,
          direccion_fiscal:cliente_externo.direccion_fiscal,
          cp:cliente_externo.cp,
          telefono:cliente_externo.telefono,
          email:cliente_externo.email,
          operacionId:operacionId
      })
      .then(cliente=>{
        
        clienteId=cliente.id
        console.log('cliente id='+clienteId)
      })

      await Cliente_Operacion.create({
        clienteId:clienteId,
        operacionId:operacionId
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

    await Consig_Operacion.create({
      consigId:consigId,
      operacionId:operacionId
    })

    }
      await Factura_Cliente.create({
          numero:factura_cliente.numero,
          total:factura_cliente.total,
          fecha:factura_cliente.fecha,
          clienteExternoCuit:factura_cliente.clienteExternoCuit
      })
      if (factura_consig.numero){
        await Factura_Consig.create({
            numero:factura_consig.numero,
            total:factura_consig.total,
            fecha:factura_consig.fecha,
            consignatarioCuit:factura_consig.consignatarioCuit
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

        await Transporte.create({
          cuit:guias[i].transporte.cuiTransportista,
          razon_social:guias[i].transporte.transportista
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
        await Vehiculo.create({
          chasis:guias[i].transporte.chasis,
          acoplado:guias[i].transporte.acoplado,
        })
        .then(vehiculo=>{
          vehiculoId=vehiculo.id
          console.log(vehiculoId)
        })
        await Chofer.create({
          cuil:guias[i].transporte.cuil,
          nombre:guias[i].transporte.chofer,
        })
        await Guia_Transporte.create({
          guiaId:guiaId,
          cuiTransporte:guias[i].transporte.cuiTransportista,
          cuilChofer:guias[i].transporte.cuil,
          idVehiculo:vehiculoId
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
            await Guia_Caravana.create({
              guiaId:guiaId,
              caravana:guias[i].animales[j].caravana
            })
          }
        }
      }


      res.send("Done")
});

module.exports = server;