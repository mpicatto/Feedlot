const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Cliente_Operacion', {

      clienteId: {
       type: DataTypes.STRING,
       allowNull: false
      },
      operacionId:{
        type: DataTypes.STRING,
        allowNull: false
       },
                     
   },
  )
};