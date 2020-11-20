const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('chofer', {
    cuil:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey: true,
        unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },  
   },
  )
};