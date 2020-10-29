const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Guia_Transporte', {

      guiaId: {
       type: DataTypes.STRING,
       allowNull: false
      },
      cuiTransporte:{
        type: DataTypes.STRING,
        allowNull: false
       },
       cuilChofer:{
        type: DataTypes.STRING,
        allowNull: false
       },
       idVehiculo:{
        type: DataTypes.STRING,
        allowNull: false
       },
       
                     
   },
  )
};