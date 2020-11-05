const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('operacion', {
    tipo:{
        type:DataTypes.ENUM,
        values:["compra","venta"],
        allowNull:false,
    },
    cant_animales: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM,
      values:["completa", "incompleta"],
      allowNull: false
    },
   },
  )
};