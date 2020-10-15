const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('sanidad', {
    caravana:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey: true,
        unique: true,
    },
      enfermedad: {
       type: DataTypes.STRING(50),
       allowNull: false
      },
      diagnostico: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      tratamiento: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      fecha_diagnostico: {
        type: DataTypes.DATE,
        allowNull: false
      },
      fecha_alta: {
        type: DataTypes.DATE,
        allowNull: false
      },
      muerte: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      costo_tratamiento: {
        type: DataTypes.STRING(8),
        allowNull: false
      },                
   },
  )
};