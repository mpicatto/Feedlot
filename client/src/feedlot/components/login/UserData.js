import React,{useState} from 'react';
// import Axios from 'axios';
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
import {addUser, cleanUser} from '../../actions/user.js';
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
  
    const classes = useStyles();
    const [input,setInput]=useState({
        name:'',
        lastName:'',
        email:'',
        password:'',
        birthday:"",
        address:"",
        city:"",
        province:"",
        cp:"",
        country:""
    });

    const onSend = async function(e){
      e.preventDefault();
      let data = {
          name:props.user.name,
          lastName:props.user.lastName,
          email:props.user.email,
          password:props.user.password,
          birthday:input.birthday,
          address:input.address + "," + input.city + "," 
                 + input.province + "," + input.cp,
          country:input.country       
      };
      console.log(data);
      await props.addUser(data);
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
            <Grid item xs={12}>
              <TextField
                //error={input.name.length===0 ? true : false}
                autoComplete="bday"
                name="birthday"
                variant="outlined"
                required
                fullWidth
                //helperText={false ? "Este campo es requerido" : null}
                id="birthday"
                label="Fecha de Nacimiento"
                type="date"
                InputLabelProps={{
                                    shrink: true,
                                  }}
                autoFocus
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Dirección"
                name="address"
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="Localidad"
                name="city"
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Province"
                label="Provincia"
                name="province"
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
                label="Cod. Postal"
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
                id="country"
                label="Pais"
                name="country"
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
    addUser: (input)=>dispatch(addUser(input)),
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