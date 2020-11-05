import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles'
import {Container, CssBaseline, Grid} from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {setSection} from '../../../actions/compras'
import {connect} from 'react-redux';

import NuevaCompra from './nuevaCompra'
import HistorialCompras from './comprasHistory'

const useStyles = makeStyles((theme) => ({
    paper: {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        maxWidth: "100%",
        minWidth:"100%"
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    background:{
      color:theme.palette.background.default
    }
  }));
 
const Compras = (props) =>{
    useEffect(()=>{
      setSection(props.seccion)
    },[props.seccion])
    const classes = useStyles()
    const [section,setSection] = useState("")
    
    const handleSection = (event, newSelection) =>{
        props.setSection(newSelection)
 
      }
    
    return(

        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid >
                    <ToggleButtonGroup
                    value={section}
                    exclusive
                    onChange={handleSection}
                    aria-label="section"
                    size="large"
                    >
                            <ToggleButton value="nuevaCompra" aria-label="nuevaCompra" >
                                Nueva Compra
                            </ToggleButton>
                            <ToggleButton value="historial" aria-label="historial" >
                               Historial de Compras
                            </ToggleButton>
         
                    </ToggleButtonGroup>
                </Grid>
                </div>
                <Grid >
                    {section ==="nuevaCompra" ? <NuevaCompra 
                    rodeo={props.rodeo}
                    establecimiento={props.establecimiento}
                    data={props.data} /> : null}
                    {section ==="historial" ? <HistorialCompras 
                    rodeo={props.rodeo}
                    establecimiento={props.establecimiento}
                   /> : null}
                </Grid>
             
            
        </Container>
        
    )
}
const mapStateToProps = state => {		
  return {		
    seccion: state.compras.section
  }		
}

const mapDispatchToProps = dispatch => {
  return {
    setSection:(section)=>dispatch(setSection(section))
  }
}
    
  
export default connect(mapStateToProps, mapDispatchToProps)(Compras)