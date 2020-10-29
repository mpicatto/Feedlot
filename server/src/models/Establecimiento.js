const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('establecimiento', {
    nombre:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    latitud: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    longitud: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    superficie: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    cp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
   },
  )
};
