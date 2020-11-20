const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('cliente_externo', {
    cuit:{
      type:DataTypes.STRING,
      allowNull:false,
      },
     razon_social:{
      type:DataTypes.STRING(50),
      allowNull:true
      },
     direccion_fiscal:{
      type:DataTypes.STRING(100),
      allowNull:true
     },
     cp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,

    },
   },
  )
};