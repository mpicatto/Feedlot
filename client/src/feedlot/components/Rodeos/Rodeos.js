import React,{useState} from 'react';
import { makeStyles } from '@material-ui/styles'
import {connect} from 'react-redux';
import {Container, CssBaseline, Grid} from '@material-ui/core'
import {Select, FormControl,MenuItem} from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {setCurrentRodeo} from '../../actions/rodeo'
import General from './general/rodeosOverview'
import Details from './details/rodeoDetails'
import Compras from './compras/compras'
import Seguimiento from './seguimiento/seguimiento'
import Ventas from './ventas/ventas'

//------import actions------------------



let rodeos=[]
let selectedRodeo={}
let selectedEstab={}
let disable=true
// let payload ={}
const useStyles = makeStyles((theme) => ({
    paper: {
      margin: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
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
 
const Rodeos = (props) =>{
    const classes = useStyles()

    const [establecimiento, setEstablecimiento] = useState("Elija una opción...")
    const [rodeo,setRodeo] = useState("Elija una opción...")
    const [section,setSection] = useState('')

    const handleEstablecimiento = (event) => {
        rodeos=[]
        setEstablecimiento(event.target.value);
        setRodeo("Elija una opción...")
        for (let i=0;i<props.rodeo.establecimientos.length;i++){
            if(props.rodeo.establecimientos[i].nombre===event.target.value){
                selectedEstab = props.rodeo.establecimientos[i]
                props.rodeo.rodeos.map(item=>{
                    if (item.establecimientoId===selectedEstab.id){
                        rodeos.push(item)
                    }
                })
            }
        }
        console.log(props.rodeo)
        setSection('')
        disable=true
    };

    const handleRodeo = (event) => {
        setRodeo(event.target.value);
                   
        for (let i=0;i<rodeos.length;i++){
            if(rodeos[i].nombre===event.target.value){
                selectedRodeo=rodeos[i]
            }
        }
        let data ={
            establecimiento:selectedEstab,
            rodeo:selectedRodeo
        }
        console.log(data)
        props.setCurrentRodeo(data)
        // setSection('general')
        if (establecimiento!=="Elija una opción..."){
            disable=false
        }
      };

      const handleSection = (event, newSelection) =>{

        setSection(newSelection)
      }
    
    return(

        <Container component="main" maxWidth="90%">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={8}>
                            <FormControl 
                             variant="filled"
                             className={classes.formControl}
                       
                             >
                                <label>Establecimiento:</label>
                                    <Select
                                        labelId="label"
                                        id="establecimiento"
                                        name="establecimiento"
                                        value={establecimiento}
                                        onChange={handleEstablecimiento}
                                        label="establecimiento"
                                        displayEmpty
                                        >
                                        <MenuItem value={"Elija una opción..."} disabled >Elija una opción...</MenuItem>
                                        {props.rodeo.establecimientos.map(item =>{
                                            return <MenuItem value={item.nombre}>{item.nombre}</MenuItem>
                                        })}
                            
                                  
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                            <FormControl variant="filled" className={classes.formControl}>
                                <label>Rodeo:</label>
                                    <Select
                                        labelId="label"
                                        id="demo-simple-select-outlined"
                                        name="rodeo"
                                        value={rodeo}
                                        onChange={handleRodeo}
                                        label="Rodeo"
                                        displayEmpty
                                        >
                                         <MenuItem value={"Elija una opción..."} disabled >Elija una opción...</MenuItem>
                                        {rodeos.map(item =>{
                                            return <MenuItem value={item.nombre}>{item.nombre}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>    
                                         
                    </Grid>
                    <Grid 
                     style={{display:"flex", flexDirection:"row",justifyContent:"center",}}
                     item xs={12} sm={8} >
                        <ToggleButtonGroup
                            value={section}
                            exclusive
                            onChange={handleSection}
                            aria-label="section"
                            >
                                <ToggleButton value="general" aria-label="general" disabled={disable}>
                                    General
                                </ToggleButton>
                                <ToggleButton value="detalle" aria-label="detalle" disabled={disable}>
                                    Detalle
                                </ToggleButton>
                                <ToggleButton value="compras" aria-label="compras" disabled={disable}>
                                Compras
                                </ToggleButton>
                                <ToggleButton value="seguimiento" aria-label="seguimiento" disabled={disable}>
                                    Seguimiento
                                </ToggleButton>
                                <ToggleButton value="ventas" aria-label="ventas" disabled={disable}>
                                    Ventas
                                </ToggleButton>
                                <ToggleButton value="sanidad" aria-label="sanidad" disabled={disable}>
                                    Sanidad
                                </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                </Grid>
            
                <Grid >
                    {section ==="general" ? <General 
                    cabezas={selectedRodeo.cabezas}
                    pesos={selectedRodeo.pesos}                        
                    enfermos={selectedRodeo.enfermos}
                    muertes={selectedRodeo.muertes} /> : null}
                    {section ==="detalle" ? <Details 
                    caravanas={selectedRodeo.caravanas}
                    rodeo={rodeo}
                    establecimiento={establecimiento}
                   /> : null}
                   {section ==="compras" ? <Compras 
                   /> : null}
                    {section ==="seguimiento" ? <Seguimiento
                    // rodeo={selectedRodeo}
                    // establecimiento={establecimiento}
                    // data={props.rodeo}
                   /> : null}
                    {section ==="ventas" ? <Ventas
                    // rodeo={selectedRodeo}
                    // establecimiento={establecimiento}
                    // data={props.rodeo}
                   /> : null}
                </Grid> 
            </div>
        </Container>
        
    )
}

const mapStateToProps = state => {		
    return {		
        user:state.user.user,
        rodeo:state.rodeo
    }		
  }

  const mapDispatchToProps = dispatch => {
    return {
      setCurrentRodeo:(data)=>dispatch(setCurrentRodeo(data)),
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Rodeos);  
