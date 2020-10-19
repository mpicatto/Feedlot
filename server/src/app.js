const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
var Strategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
var path = require('path');
const db = require('./db.js');

//CON ESTA FUNCION NOS BUSCA EL USER EN LA BASE DE DATOS PARA LOGUEARSE
passport.use(new Strategy(
  function(username, password, done){

    //VERIFICA EL USER EN LA BASE DE DATOS
    db.User.findOne({
      where:{
        email: username,
      }
    })
    .then((user) => {
      console.log(user);
      //SINO ENCUENTRA USUARIO VUELVE FALSE
      if(!user){
        return done(null,false);
      }
      //COMPARA LA PASSWORD CON EL HASH DE BCRYPT
      bcrypt.compare(password, user.password, function(err, res) {
        if (res){
          return done(null, user);
        } else {
          return done(null, false)
        }
      });
    })
    .catch(err => {
      console.log(err)
      return done(err);
    })
  }));

  passport.serializeUser(function(user, done){
    done(null, user.cuit);
  });

  passport.deserializeUser(function(id, done){
    db.User.findByPk(cuit)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      return done(err);
    })
  });

const server = express();
server.use(express.static(path.join(__dirname, 'public')));
server.use(require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  	res.header('Access-Control-Allow-Credentials', 'true');
  	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
  // console.log(req.session);
  // console.log(req.user);
  next();
});

// ---------------rutas del server-----------
 server.use('/', routes);

//ESTA FUNCION ES PARA INICIAR SESION!!
server.post('/login',
  passport.authenticate('local', {failureRedirect: '/login'}),
  function(req, res) {
    // var aux ={
    //   user: req.user,
    //   cookie: req.session
    // }
    res.send(req.user);
  });

//PARA DESLOGUIARSE!!!
server.get('/logout', function(req, res){
  req.logOut();
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        next(err)
      } else {
        res.clearCookie('connect.sid')
        //res.redirect('/')
      }
    })
  }
});

   // Error catching endware.
  server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

module.exports = server;