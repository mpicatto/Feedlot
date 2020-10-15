const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dieta', {
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
   },  
  )
};