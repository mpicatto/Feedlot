import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import {lighten, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {cancelCompra,setStep} from '../../../../actions/compras'
import {connect} from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
//-------------------------Table imports--------------------------------------------------------------------
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

//ESTILOS DE MATERIAL UI
const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:"space-around"
    },
    formControl: {
        margin: theme.spacing(1),
        maxWidth: "100%",
        minWidth:"100%"
      },

    background:{
      color:theme.palette.background.default
    }
  }));

export function Step2(props) {
    const classes = useStyles()

    useEffect(()=>{

    },[])

    const volverFunc = function(e){
      e.preventDefault()
      props.setStep("1")
  }

    const cancelFunc = function(e){
        e.preventDefault()
        props.cancelCompra()
    }
    const continueFunc = function(e){
      e.preventDefault()
      props.setStep("3")
      
  }

    return (
      <Grid container spacing={2} >
       <Grid item xs={12} sm={3}></Grid><Grid item xs={12} sm={3}></Grid><Grid item xs={12} sm={3}></Grid><Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={3}>
            <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(e)=>volverFunc(e)} >
                  Volver
              </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
              <Button                               
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(e)=>cancelFunc(e)} >
                  Cancelar
              </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
              <Button                              
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(e)=>continueFunc(e)} >
                  Continuar
              </Button>
      </Grid>
  </Grid>     
    
      )
 
 }

const mapStateToProps = state => {		
  return {		
    vendedor:state.compras.vendedor,
    step:state.compras.step,

  }		
}

const mapDispatchToProps = dispatch => {
  return {
    cancelCompra:()=>dispatch(cancelCompra()),
    setStep:(number)=>dispatch(setStep(number)),

  }
}
    


export default connect(mapStateToProps, mapDispatchToProps)(Step2)