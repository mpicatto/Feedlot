import React,{useState} from 'react';
import { makeStyles } from '@material-ui/styles'
import {Container, CssBaseline, Grid} from '@material-ui/core'
import {Select, FormControl,MenuItem} from '@material-ui/core'
import GeneralTable from './Rodeo_General_Table'
import AnimalNumbers from '../charts/rodeoDash'


const useStyles = makeStyles((theme) => ({
    paper: {
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
    const [chart,setChart] = useState('cabezas')
    
    const handleChart = (event) => {
        setChart(event.target.value);
      };

    return(

        <Container component="main" >
            <CssBaseline />
            <div className={classes.paper}>
                <div  >
  
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                            <Grid>
                            <FormControl variant="filled" className={classes.formControl}>
                                <label>Gráfico</label>
                                    <Select
                                        labelId="charts"
                                        id="charts"
                                        name="charts"
                                        value={chart}
                                        onChange={handleChart}
                                        label="Charts"
                                        displayEmpty
                                        >
                                        <MenuItem value={"cabezas"}>Cabezas y Peso</MenuItem>
                                        <MenuItem value={"enfermos"}>Sanidad</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>  
                        <GeneralTable/>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <AnimalNumbers 
                        cabezas={props.cabezas}
                        pesos={props.pesos}                        
                        enfermos={props.enfermos}
                        muertes={props.muertes}
                        chart={chart}/>
                 
                    </Grid>    
                </Grid>
            </div>
        </Container>
        
    )
}

export default Rodeos