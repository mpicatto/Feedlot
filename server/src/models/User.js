const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    cuit:{
        type:DataTypes.STRING(11),
        allowNull:false,
        primaryKey: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true
        }
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      },  
    razon_social:{
        type:DataTypes.STRING(50),
        allowNull:true
    },  
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    calle: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    numero: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    departamento: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    localidad: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    provincia: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    cp: {
        type: DataTypes.STRING(5),
        allowNull: true
      },
    telefono1: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    telefono2: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
    },
  )
};
