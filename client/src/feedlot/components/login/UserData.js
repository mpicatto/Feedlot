import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {cleanUser} from '../../actions/user.js';
import { setRedirectOff} from '../../actions/global'
import {connect} from 'react-redux';



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
    const history = useHistory()
    const classes = useStyles();
    const [input,setInput]=useState({
        cuit:'',
        razon_social:'',
        email:'',
        password:'',
        nombre:"",
        apellido:"",
        calle:"",
        numero:"",
        departamento:"",
        localidad:"",
        provincia:"",
        cp:"",
        telefono1:"",
        telefono2:""
    });



    const onSend = function(e){
      e.preventDefault();
    
      let data = {
          cuit:props.user.cuit,
          razon_social:props.user.razon_social,
          email:props.user.email,
          password:props.user.password,
          nombre:input.nombre,
          apellido:input.apellido,
          calle:input.calle,
          numero:input.numero,
          departamento:input.departamento,
          localidad:input.localidad,
          provincia:input.provincia,
          cp:input.cp,
          telefono1:input.telefono1,
          telefono2:input.telefono2
      };
      console.log(data);

      Axios.post ("http://localhost:3001/user",data)
      .then(res=>{
        if(res.status===201){
          alert("Usuario creado.")
          history.push("/")
        }else{alert("El usuario no ha sido creado, por favor vuelva a intentar")}
      })
      .catch(err=>{
          alert(err);
      })

      props.cleanUser();
      props.setRedirectOff(); 
    }

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

      
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Datos del Usuario 
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="nombre"
                label="Nombre"
                name="nombre"
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="apellido"
                label="Apellido"
                name="apellido"
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="calle"
                label="Calle"
                name="calle"
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="numero"
                label="Num"
                name="numero"
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="departamento"
                label="Depto"
                name="departamento"
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="cp"
                label="Cod.Postal"
                name="cp"
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>            
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="localidad"
                label="Localidad"
                name="localidad"
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="provincia"
                label="Provincia"
                name="provincia"
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="telefono1"
                label="Celular"
                name="telefono1"
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="telefono2"
                label="Telefono Oficina"
                name="telefono2"
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>

          
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e)=>onSend(e)}
          >
            Registrarse
          </Button>
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  )
 }

const mapStateToProps = state => {		
  return {		
    user: state.user.user,
    redirect: state.global.redirect
  }		
}

const mapDispatchToProps = dispatch => {
  return {
    // addUser: (input)=>dispatch(addUser(input)),
    cleanUser:()=>dispatch(cleanUser()),
    setRedirectOff:()=>dispatch(setRedirectOff())
  }
}
    
export function validate(input) {
  let errors = {};
if(input.birthday===""){
  errors.birthday= "Por favor introduzca su fecha de nacimiento"

}else if(input.address===""){
  errors.address= "Por favor introduzca su dirección"

}else if(input.city===""){
  errors.city= "Por favor introduzca su localidad"

}else if(input.province===""){
  errors.province= "Por favor introduzca su provincia"

}else if(input.cp===""){
  errors.cp= "Por favor introduzca su código postal"

}else if(input.country===""){
  errors.country= "Por favor introduzca su país"

}
  return errors;
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);