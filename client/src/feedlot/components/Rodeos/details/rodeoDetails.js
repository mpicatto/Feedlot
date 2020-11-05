import React,{useEffect} from 'react';
// import { makeStyles } from '@material-ui/styles'
import {Container, CssBaseline, Grid} from '@material-ui/core'
import {caravanas} from '../mockData'
import DetailTable from './rodeo_detail_table'
let data=[]

const filter = (props)=>{
  data=[]
  //------Filtrar caravanas(provisorio hasta definir db)--------
 
      caravanas.map(item=>{
              data.push(item)
      })
  
  console.log(data)
}


const Details = (props) =>{
    // const classes = useStyles();
    useEffect(()=>{data=[]
    },[])
    filter(props)
    
    return(

        <Container component="main" maxWidth="90%">
            <CssBaseline />
                <Grid container >
                    
                </Grid>     
                <Grid>          
                <DetailTable data={data}/>      
                </Grid>
        </Container>
        
    )
}

export default Details