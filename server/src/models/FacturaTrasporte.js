const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Factura_Transporte', {
     numero:{
      type:DataTypes.STRING(50),
      allowNull:true
      },
     total:{
      type:DataTypes.STRING(50),
      allowNull:true
     },
     guiaId:{
      type:DataTypes.STRING,
      allowNull:false
     },
     cuiTransporte:{
      type:DataTypes.STRING,
      allowNull:false
     },
     
    },
  )
};