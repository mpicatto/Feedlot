require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://postgres:root@localhost:5432/feedlotApp`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
 const {User,Establecimiento,Categoria,Operacion,Cliente_externo,Consignatario,
  Factura_Cliente, Factura_Consig,Guia, Transporte,Chofer,Vehiculo,Factura_Transporte,
  Rodeo, Caravana,Dieta,Alimento,} = sequelize.models;

// Aca vendrian las relaciones
//Product.hasMany(Reviews);
User.hasMany(Establecimiento);
Establecimiento.belongsTo(User);
User.hasMany(Categoria);
Categoria.belongsTo(User)
User.hasMany(Operacion)
Operacion.belongsTo(User)
Cliente_externo.hasMany(Factura_Cliente)
Operacion.hasOne(Factura_Cliente)
Factura_Cliente.belongsTo(Operacion)
Factura_Cliente.belongsTo(Cliente_externo)
Operacion.hasOne(Factura_Consig)
Factura_Consig.belongsTo(Operacion)
Factura_Consig.belongsTo(Consignatario)
Guia.hasOne(Factura_Transporte)
Factura_Transporte.belongsTo(Guia)
Transporte.hasOne(Factura_Transporte)
Factura_Transporte.belongsTo(Transporte)
Guia.hasOne(Vehiculo)
Vehiculo.belongsToMany(Guia,{ through: "guia_vehiculo" })
Transporte.hasMany(Vehiculo)
Vehiculo.belongsTo(Transporte)
Guia.hasOne(Chofer)
Chofer.belongsToMany(Guia,{ through: "guia_chofer" })
Transporte.hasMany(Chofer)
Chofer.belongsTo(Transporte)
Establecimiento.hasMany(Rodeo)
Rodeo.belongsTo(Establecimiento)
Categoria.hasMany(Rodeo)
Rodeo.belongsTo(Categoria)
Rodeo.hasMany(Caravana)
Caravana.belongsTo(Rodeo)
Guia.hasMany(Caravana)
Caravana.belongsToMany(Guia,{ through: "guia_caravana" })
Categoria.hasOne(Dieta)
Dieta.belongsTo(Categoria)


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
