const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Guia_Caravana', {

      guiaId: {
       type: DataTypes.STRING,
       allowNull: false
      },
      caravana:{
        type: DataTypes.STRING,
        allowNull: false
       },
                     
   },
  )
};