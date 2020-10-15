const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('rodeo', {
    nombre: {
      type: DataTypes.STRING(25),
      allowNull: true
    },  
   },
  )
};