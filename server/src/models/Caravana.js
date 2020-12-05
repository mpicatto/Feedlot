const { Sequelize, Op, Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('caravana', {
    caravana:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey: true,
        unique: true,
    },
      raza: {
       type: DataTypes.STRING(25),
       allowNull: false
      },
      sexo: {
        type: DataTypes.ENUM,
        values:["m","h"],
        allowNull: false
      },
      frame: {
        type: DataTypes.ENUM,
        values:["1","2","3","4","5","6","7","8","9"],
        allowNull: false
      },
      fecha_ingreso: {
        type:DataTypes.STRING,
        allowNull: true
      },
      peso_inicio: {
        type: DataTypes.STRING,
        allowNull: true
      },
      peso_actual: {
        type: DataTypes.STRING,
        allowNull: true
      },
      fecha_pesaje: {
        type: DataTypes.STRING,
        allowNull: true
      },
      fecha_egreso: {
        type: DataTypes.STRING,
        allowNull: true
      },
      estado: {
        type: DataTypes.ENUM,
        values:["engorde","enfermo","aFeria","aDestino","vendido","muerto"],
        allowNull: false
      },
      rodeoId:{
          type: DataTypes.STRING,
          allowNull: false
        },
      establecimientoId:{
          type: DataTypes.STRING,
          allowNull: false
        },  
                     
   },
  )
};