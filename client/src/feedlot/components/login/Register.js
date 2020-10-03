import React,{useState} from 'react';
import Axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {setUser} from '../../actions/user.js';
import {setRedirect, setRedirectOff} from '../../actions/global'
import {connect} from 'react-redux';
import UserData from './UserData.js';
// import { useHistory } from 'react-router-dom';
/*

este es el inicio de sesion, los pedazos de codigo comentados(linea 11 y 65-67) me tiraban error

*/

//ESTILOS DE MATERIAL UI
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export function Register(props) {
  
    const classes = useStyles();
    const [input,setInput]=useState({
        name:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword: ''
  
    });

    const verifyUser = function(e){
      e.preventDefault();
      Axios.get("http://localhost:3001/user/"+input.email)
      .then(res=>{
        console.log(res.data)
        if (res.data.length===0){
          let user = {
            name:input.name,
            lastName:input.lastName,
            email:input.email,
            password:input.password
          }
          let status = true
          props.setUser(user)
          props.setRedirect(status)

        }else{alert("El mail ya esta en uso")}
   
      })
    }

    // const onSend = function(e){
    //   e.preventDefault();
    //   props.addUser(input)
    
    // }

    //MANEJO DE ONCHANGE()
    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]:e.target.value
        })
        console.log(input)
        setErrors(validate({
          ...input,
          [e.target.name]: e.target.value,
        }));
      }

      const [errors, setErrors] = useState({});

      

  if (!props.redirect){
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro de Usuario
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.name}
                  //error={input.name.length===0 ? true : false}
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  helperText={errors.name}
                  fullWidth
                  //helperText={false ? "Este campo es requerido" : null}
                  id="firstName"
                  label="Nombre/s"
                  autoFocus
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.lastName}
                  helperText={errors.lastName}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido/s"
                  name="lastName"
                  autoComplete="off"
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.email}
                  helperText={errors.email}
                // error={!/\S+@\S+\.\S+/.test(input.email) ? true : false}
                  //helperText={true ? "Debe ser un mail valido" : null}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="off"
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.password}
                  helperText={errors.password}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="off"
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar Contraseña"
                  type="password"
                  id="password"
                  autoComplete="off"
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Deseo recibir notificaciones e información via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e)=>verifyUser(e)}
            >
              Continuar
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Ya tiene una cuenta? Ingresar
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {/* <Box mt={5}>
          <Copyright />
        </Box> */}
      </Container>
    );
  } else{
  return (
    <UserData />
  )
 }
}

const mapStateToProps = state => {		
  return {		
    user: state.user,
    redirect: state.global.redirect
  }		
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user)=>dispatch(setUser(user)),
    setRedirect:(status)=>dispatch(setRedirect(status)),
    setRedirectOff:()=>dispatch(setRedirectOff())
  }
}
    
export function validate(input) {
  let errors = {};
 if(!input.name){
   errors.name= 'Por favor introduzca su nombre'
 }
 if(!input.lastName){
  errors.lastName= 'Por favor introduzca su apellido'
}
  if (!input.email) {
    errors.email = 'Por favor introduzca su email';
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = 'El email es invalido';
  }
if(!input.password){
  errors.password = 'Por favor introduzca su contraseña';
} else if (!/([A-Za-z][A-Za-z0-9]*[0-9][A-Za-z0-9])/.test(input.password)) {
  errors.password = 'La contraseña debe contener una letra mayuscula y al menos dos numeros';

}else if(input.password !== input.confirmPassword){
  errors.password= "Las contraseñas no coinciden"

}
  return errors;
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);