import React from 'react';
import { makeStyles } from '@material-ui/styles'
import {Container, CssBaseline,Typography, Grid} from '@material-ui/core'
import AnimalStock from './sitRep_animal_stock'
import AnimalMov from './sitRep_animal_mov'
import AlimentosStock from './sitRep_Alimentos_Stock'
import AlimentosAlert from './sitRep_Alimentos_Alerts'

const useStyles = makeStyles((theme) => ({
    paper: {
      margin: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    table: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    background:{
      color:theme.palette.background.default
    }
  }));



const SitRep = (props) =>{
    const classes = useStyles()
    
    return(

        <Container component="main" maxWidth="90%">
            <CssBaseline />
            <div className={classes.paper}>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <Typography align="center" component="h1" variant="h5">
                        Stock y Movimiento de Animales
                    </Typography>
                     <AnimalStock />
                     <AnimalMov />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Typography align="center" component="h1" variant="h5">
                       Stock y Consumo de Forrajes
                    </Typography>
                     <AlimentosStock/>
                     <AlimentosAlert/>
                    </Grid>    
                </Grid>
            </div>
        </Container>
        
    )
}

export default SitRep