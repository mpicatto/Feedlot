const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('consignatario', {
    cuit:{
      type:DataTypes.STRING(11),
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
      type: DataTypes.STRING(5),
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      // validate: {
      //     isEmail: true
      // }
    },
   },
  )
};