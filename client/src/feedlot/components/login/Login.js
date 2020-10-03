import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import {setUser} from '../../actions/user.js';
import {connect} from 'react-redux';
/*

este es el inicio de sesion, los pedazos de codigo comentados(linea 11 y 71-73) me tiraban error

*/
export function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        <a href="https://www.soyhenry.com">Henry!</a>
      </Typography>
    );
  } 
  
  //LOS ESTILOS DEL FORMULARIO SETEADOS
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  

  //LOGIN PRINCIPAL DE LA PAGINA!
  export function Login(props) {
    
    const classes = useStyles();
    const [input,setInput]=React.useState({
      email:'',
      password:''
    });

    //MANEJO DE ONCHANGE()
    const handleInputChange = function(e) {
      setInput({
        ...input,
        [e.target.name]:e.target.value
      })
    }

    const loginUser = function(e){
      e.preventDefault();
      Axios.post('http://localhost:3001/login',input,{withCredentials:true})
      .then(resp=>{
        props.setUser(resp)
      })
    }
    //COMPONENTE DE MATERIAL UI
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresar
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="username"
              autoComplete="email"
              autoFocus
              onChange={(e) => handleInputChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>handleInputChange(e)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e)=>loginUser(e)}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotPassword" variant="body2">
                  ¿Olvido la contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link to = "/register">
                  <span>
                  ¿No tiene una cuenta? Registrese

                  </span>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }

  const mapStateToProps = state => {		
    return {		
      user: state.user,
    }		
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      setUser: (resp)=>dispatch(setUser(resp)),
    }
  }
      
  export default connect(mapStateToProps, mapDispatchToProps)(Login);  