const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('categoria', {
    nombre:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    peso_min: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    peso_max: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    terminacion:{
      type:DataTypes.BOOLEAN,
      allowNull:false
    }
   },
  )
};
