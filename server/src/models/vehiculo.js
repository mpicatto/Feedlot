const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('vehiculo', {
    chasis: {
      type: DataTypes.STRING,
      allowNull: true
    },
    acoplado: {
        type: DataTypes.STRING,
        allowNull: true
      },    
   },
  )
};