const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('guia', {
    numero:{
        type:DataTypes.STRING(25),
        allowNull:false,
    },
    lugar_pesaje: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ticket_balanza: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    peso_neto:{
        type:DataTypes.STRING(10),
    }
   },
  )
};