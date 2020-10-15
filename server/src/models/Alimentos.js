const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('alimento', {
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    grupo: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
    forma_fisica: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
    momento: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
    ms_percent: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
    divms_percent: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
    em: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
    pb_percent: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
    pdr_percent: {
        type: DataTypes.STRING(10),
        allowNull: false
      },   
    calcio: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
    fosforo: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
    stock: {
        type: DataTypes.STRING(10),
        allowNull:false
      },
    precio: {
          type: DataTypes.STRING(10),
          allowNull:false
        },                       
   },
  )
};