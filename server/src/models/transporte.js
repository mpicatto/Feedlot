const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('transporte', {
    cuit:{
        type:DataTypes.STRING(11),
        allowNull:false,
        primaryKey: true,
        unique: true,
    },
    razon_social: {
      type: DataTypes.STRING(50),
      allowNull: true
    },  
   },
  )
};