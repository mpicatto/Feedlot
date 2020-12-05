import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles'
import {Container, CssBaseline, Grid} from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {setSection} from '../../../actions/seguimiento'
import {connect} from 'react-redux';
import Pesaje from './pesaje';
import Movimiento from './movimiento'



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
 
const Seguimiento = (props) =>{
    useEffect(()=>{
      setSection(props.seccion)
    },[props.seccion])
    const classes = useStyles()
    const [section,setSection] = useState("")
    
    const handleSection = (event, newSelection) =>{
        props.setSection(newSelection)
 
      }
    
    return(

        <Container component="main" maxWidth='lg'>
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
                            <ToggleButton value="pesaje" aria-label="pesaje" >
                                Pesaje
                            </ToggleButton>
                            <ToggleButton value="movimientos" aria-label="movimientos" >
                               Movimiento 
                            </ToggleButton>
         
                    </ToggleButtonGroup>
                </Grid>
                </div>
                <Grid >
                    {section ==="pesaje" ? <Pesaje /> : null}
                    {section ==="movimientos" ? <Movimiento /> : null}
                </Grid>
             
            
        </Container>
        
    )
}
const mapStateToProps = state => {		
  return {		
    seccion: state.seguimiento.section
  }		
}

const mapDispatchToProps = dispatch => {
  return {
    setSection:(section)=>dispatch(setSection(section))
  }
}
    
  
export default connect(mapStateToProps, mapDispatchToProps)(Seguimiento)