const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('racion', {
    dieta_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    alimento_id:{
      type: DataTypes.STRING(10),
      allowNull: false
    },
    racion:{
        type: DataTypes.STRING(10),
        allowNull: false
    }
   },  
  )
};