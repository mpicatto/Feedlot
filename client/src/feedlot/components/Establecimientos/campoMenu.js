import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Axios from 'axios';
import {setRodeoState} from '../../actions/rodeo'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid } from '@material-ui/core';
  
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:"space-around",
      width:"100%"
    },
    formControl: {
        margin: theme.spacing(1),
        maxWidth: "100%",
        minWidth:"100%"
      },

    background:{
      color:theme.palette.background.default
    },
    root: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      }
  }));
    
    export function CampoMenu(props){

      useEffect(()=>{
        getInfo()
      },[])

    const classes = useStyles();
    const [establecimiento, setEstablecimineto]=useState([])
    const [rodeos,setRodeos]=useState([])
    const [categorias,setCategorias]=useState([])

    const getInfo = function(){
        Axios.get('http://localhost:3001/establecimiento/'+props.user.cuit)
        .then(res=>{
            console.log(res.data)
            props.setRodeoState(res.data)
        })
        .catch(err =>{
          alert("Error en la base de datos, intente nuevamente")
        })
    }

    return(
        
        <Grid container
        direction='column'>
        <hr></hr>
          {props.rodeo.establecimientos.map(item=>{
            return <Link to={'/feedlot/sitrep'}>{item.nombre}</Link>
          })}
        </Grid>
    )

  }

  const mapStateToProps = state => {
    return{
      user:state.user.user,
      rodeo:state.rodeo
    }				
  }

  const mapDispatchToProps = dispatch => {
      return{setRodeoState:(rodeoState)=>dispatch(setRodeoState(rodeoState))}
  }

  export default connect(mapStateToProps,mapDispatchToProps)(CampoMenu);