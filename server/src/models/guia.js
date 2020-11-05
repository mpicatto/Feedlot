const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('guia', {
    numero:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    lugar_pesaje: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ticket_balanza: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    peso_neto:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cantAnimales:{
      type:DataTypes.STRING,
      allowNull:false
  },
    operacionId:{
      type:DataTypes.STRING,
      allowNull:false
  }
   },
  )
};