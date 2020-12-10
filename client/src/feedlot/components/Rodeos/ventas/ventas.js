import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles'
import {Container, CssBaseline, Grid} from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {setSection,} from '../../../actions/ventas'
import {connect} from 'react-redux';
import NuevaOrden from './nuevaOrden'
import Guias from './guias'
import Facturacion from './facturacion'
import HistorialVentas from './ventasHistory'

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
 
const Ventas = (props) =>{
    useEffect(()=>{
      setSection(props.seccion)
    },[props.seccion])
    const classes = useStyles()
    const [section,setSection] = useState("")
    
    const handleSection = (event, newSelection) =>{
        props.setSection(newSelection)
 
      }
    
    return(

        <Container component="main" maxWidth="lg">
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
                    <ToggleButton value="nuevaOrden" aria-label="nuevaOrden" >
                        Nueva Orden
                    </ToggleButton>
                    <ToggleButton value="guias" aria-label="guias" >
                        Carga de Guias
                    </ToggleButton>
                    <ToggleButton value="facturacion" aria-label="facturacion" >
                        Facturacion
                    </ToggleButton>
                    <ToggleButton value="historial" aria-label="historial" >
                        Historial de Ventas
                    </ToggleButton>
        
                  </ToggleButtonGroup>
                </Grid>
                </div>
                <Grid >
                    {section ==="nuevaOrden" ? <NuevaOrden /> : null}
                    {section ==="guias" ? <Guias /> : null}
                    {section ==="facturacion" ? <Facturacion /> : null}
                    {section ==="historial" ? <HistorialVentas /> : null}
                </Grid>
        </Container>
        
    )
}
const mapStateToProps = state => {		
  return {		
    seccion: state.ventas.section
  }		
}

const mapDispatchToProps = dispatch => {
  return {
    setSection:(section)=>dispatch(setSection(section))
  }
}
    
  
export default connect(mapStateToProps, mapDispatchToProps)(Ventas)